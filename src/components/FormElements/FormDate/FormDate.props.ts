import { ReactNode } from 'react';

import { FormikProps } from '../../../types';

export interface FormDateProps {
  label: string;
  name: string;
  formik: FormikProps;
  children: ReactNode;
}