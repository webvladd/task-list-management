import { useState } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { Button, Notification } from '@mantine/core';

import { ValidationSchema } from '../../utils/ValidationSchema';
import { FormInput, FormTextarea, FormDate, FormSelect } from '../FormElements';

import { Task } from '../../types';

import s from './TaskForm.module.scss';

const initialValues = {
  id: '',
  taskName: '',
  description: '',
  ownerName: '',
  deadline: new Date().toString(),
  status: 'готова к работе'
};

const TaskForm: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [taskCreated, setTaskCreated] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      values.id = uuidv4();
      const updatedTasks = [...tasks, values];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTaskCreated(true);
      formik.resetForm();
    }
  });

  return (
    <section className={s.create_task}>
      <div className={s.create_task_wrap}>
        <h1 className={s.create_task_title}>Создать задачу</h1>

        <form className={s.create_task_form} onSubmit={formik.handleSubmit}>
          <FormInput
            label='Название задачи'
            name='taskName'
            formik={formik}
            children={null}
          />

          <FormTextarea
            label='Описание задачи'
            name='description'
            formik={formik}
            children={null}
          />

          <FormInput
            label='Имя владельца задачи'
            name='ownerName'
            formik={formik}
            children={null}
          />

          <FormDate
            label='Дедлайн задачи'
            name='deadline'
            formik={formik}
            children={null}
          />

          <FormSelect
            label='Текущий статус'
            name='status'
            formik={formik}
            children={null}
          />

          <div className={s.button_group}>
            <Button type='submit'>Добавить</Button>
          </div>
        </form>

        {taskCreated && (
          <Notification
            title={`Ваша задача создана`}
            color='green'
            onClose={() => setTaskCreated(false)}
          />
        )}
      </div>
    </section>
  );
};

export default TaskForm;
