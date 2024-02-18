import * as Yup from 'yup';

export const ValidationSchema = Yup.object({
  taskName: Yup.string().required('Обязательное поле'),
  description: Yup.string().required('Обязательное поле'),
  ownerName: Yup.string().required('Обязательное поле'),
  status: Yup.string().required('Обязательное поле')
});