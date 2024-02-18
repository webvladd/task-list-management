import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Notification } from '@mantine/core';

import { ValidationSchema } from '../../utils/ValidationSchema';
import { FormInput, FormTextarea, FormDate, FormSelect } from '../FormElements';

import { EditTaskFormProps } from './EditTaskForm.props';
import { Task } from '../../types';

import s from './EditTaskForm.module.scss';

const EditTaskForm = ({ idTask }: EditTaskFormProps): JSX.Element => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const formik = useFormik({
    initialValues: selectedTask
      ? { ...selectedTask, deadline: selectedTask.deadline || '' }
      : {
          id: '',
          taskName: '',
          description: '',
          ownerName: '',
          deadline: '',
          status: ''
        },
    validationSchema: ValidationSchema,
    onSubmit: (values: Task) => {
      const updatedTasks = updateTaskById(tasks, values);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTaskCreated(true);
    }
  });

  useEffect(() => {
    const foundTask = tasks.find((item) => item.id === idTask);
    if (foundTask) {
      setSelectedTask(foundTask);
    }
  }, [tasks, idTask]);

  useEffect(() => {
    if (selectedTask) {
      formik.setValues(selectedTask);
    }
  }, [selectedTask]);

  const [taskCreated, setTaskCreated] = useState<boolean>(false);

  const handleCancel = () => {
    navigate('/');
  };

  const handleDelete = () => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== idTask;
    });
    setTasks(filteredTasks);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    navigate('/');
  };

  function updateTaskById(tasks: Task[], values: Task): Task[] {
    return tasks.map((task) => {
      if (task.id === values.id) {
        return {
          ...task,
          ...values
        };
      }
      return task;
    });
  }

  return (
    <section className={s.edit_task}>
      <div className={s.edit_task_wrap}>
        <h1 className={s.edit_task_title}>Изменить задачу</h1>
        {selectedTask && Object.keys(selectedTask).length > 0 ? (
          <form className={s.edit_task_form} onSubmit={formik.handleSubmit}>
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
              <Button type='button' color='cyan' onClick={handleCancel}>
                Назад
              </Button>
              <Button type='submit' color='teal'>
                Сохранить
              </Button>

              <Button type='button' color='red' onClick={handleDelete}>
                Удалить
              </Button>
            </div>
          </form>
        ) : (
          <p>Объект не содержит свойств.</p>
        )}

        {taskCreated && (
          <Notification
            title={`Изменения сохранены`}
            color='green'
            onClose={() => setTaskCreated(false)}
          />
        )}
      </div>
    </section>
  );
};

export default EditTaskForm;
