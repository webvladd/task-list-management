import { ReactNode } from 'react';

import { FormikProps } from '../../../types';

export interface FormSelectProps {
  label: string;
  name: string;
  formik: FormikProps;
  children: ReactNode;
}