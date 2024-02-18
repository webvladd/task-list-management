import { DateValue } from '@mantine/dates';
import { FormikHandlers } from 'formik';
export interface Task {
  id: string;
  taskName: string;
  description: string;
  ownerName: string;
  deadline: string;
  status: string;
}

export interface FormikValues {
  [key: string]: string | Date;
}

export interface FormikErrors {
  [key: string]: string | undefined;
}

type HandleChange = FormikHandlers['handleChange'];

export interface FormikProps {
  values: FormikValues;
  errors: FormikErrors;
  touched: Record<string, boolean>;
  handleChange: HandleChange;
  setFieldValue(name: string, date: DateValue | string): void;
}

export interface RowData {
  taskName: string;
  description: string;
  ownerName: string;
  deadline: Date;
  status: string;
}

export interface FilterState {
  taskName: string;
  description: string;
  ownerName: string;
  status: string | null;
  deadlineFrom: Date | null;
  deadlineTo: Date | null;
}

export interface SortPayload {
  sortBy: string | null;
  reversed: boolean;
}

export interface ThProps {
  children: React.ReactNode;
  minWidth?: string;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

