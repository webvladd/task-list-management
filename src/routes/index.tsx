import { Navigate, Routes, Route } from 'react-router-dom';
import CreateTaskPage from '../pages/CreateTaskPage';
import TaskListPage from '../pages/TaskListPage';
import EditTaskPage from '../pages/EditTaskPage';

export const useRoutes: () => JSX.Element = () => {
  return (
    <Routes>
      <Route element={<TaskListPage />} path='/' />
      <Route element={<EditTaskPage />} path='/:id' />
      <Route element={<CreateTaskPage />} path='/create-task' />

      <Route element={<Navigate to='/' />} path='*' />
    </Routes>
  );
};
