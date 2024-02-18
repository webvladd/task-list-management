import { Textarea } from '@mantine/core';

import { FormTextareaProps } from './FormTextarea.props';

export const FormTextarea = ({
  label,
  name,
  formik
}: FormTextareaProps): JSX.Element => {
  const value =
    typeof formik.values[name] === 'string' ||
    typeof formik.values[name] === 'number'
      ? formik.values[name]
      : formik.values[name]?.toString() || '';

  return (
    <Textarea
      label={label}
      id={name}
      name={name}
      value={typeof value === 'string' ? value : ''}
      onChange={formik.handleChange}
      error={formik.touched[name] && formik.errors[name]}
      autosize
      minRows={2}
    />
  );
};
