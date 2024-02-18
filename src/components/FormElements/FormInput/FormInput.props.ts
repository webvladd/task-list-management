import { ReactNode } from 'react';

import { FormikProps } from '../../../types';

export interface FormInputProps {
  label: string;
  name: string;
  formik: FormikProps;
  children: ReactNode;
}