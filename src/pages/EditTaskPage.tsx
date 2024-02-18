import { useParams } from 'react-router-dom';

import EditTaskForm from '../components/EditTaskForm';

const EditTaskPage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Ошибка: ID не найден в URL-адресе</div>;
  }

  return (
    <>
      <EditTaskForm idTask={id} />
    </>
  );
};

export default EditTaskPage;
