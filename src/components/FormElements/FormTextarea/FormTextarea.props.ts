import { ReactNode } from 'react';

import { FormikProps } from '../../../types';

export interface FormTextareaProps {
  label: string;
  name: string;
  formik: FormikProps;
  children: ReactNode;
}