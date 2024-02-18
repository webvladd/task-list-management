import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface EditTaskFormProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  idTask: string;
  children?: ReactNode;
}
