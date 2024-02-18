import { Select } from '@mantine/core';

import { FormSelectProps } from './FormSelect.props';

const statusOptions = [
  { label: 'готова к работе', value: 'готова к работе' },
  { label: 'взята в работу', value: 'взята в работу' },
  { label: 'выполнена', value: 'выполнена' }
];

export const FormSelect = ({
  label,
  name,
  formik
}: FormSelectProps): JSX.Element => {
  const value =
    typeof formik.values[name] === 'string' ||
    typeof formik.values[name] === 'number'
      ? formik.values[name]
      : formik.values[name]?.toString() || '';

  return (
    <Select
      label={label}
      id={name}
      name={name}
      value={typeof value === 'string' ? value : ''}
      onChange={(value) => formik.setFieldValue(name, value)}
      error={formik.touched[name] && formik.errors[name]}
      data={statusOptions}
    />
  );
};
