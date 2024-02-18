import { TextInput } from '@mantine/core';

import { FormInputProps } from './FormInput.props';

export const FormInput = ({
  label,
  name,
  formik
}: FormInputProps): JSX.Element => {
  const value =
    typeof formik.values[name] === 'string' ||
    typeof formik.values[name] === 'number'
      ? formik.values[name]
      : formik.values[name]?.toString() || '';

  return (
    <TextInput
      label={label}
      id={name}
      name={name}
      value={typeof value === 'string' ? value : ''}
      onChange={formik.handleChange}
      error={formik.touched[name] && formik.errors[name]}
    />
  );
};
