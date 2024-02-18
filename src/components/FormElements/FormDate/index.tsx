import { DateInput } from '@mantine/dates';

import { FormDateProps } from './FormDate.props';

export const FormDate = ({
  label,
  name,
  formik
}: FormDateProps): JSX.Element => {
  const parseDateFromString = (value: string | Date): Date | string => {
    return value ? new Date(value) : '';
  };

  let dateValue: Date | string = '';

  if (typeof formik.values[name] === 'string') {
    const parsedDate = parseDateFromString(formik.values[name]);
    dateValue = parsedDate;
  } else if (formik.values[name] instanceof Date) {
    dateValue = formik.values[name];
  }

  return (
    <DateInput
      label={label}
      id={name}
      name={name}
      value={typeof dateValue === 'string' ? new Date() : dateValue}
      valueFormat='DD.MM.YYYY'
      onChange={(date) => formik.setFieldValue(name, date)}
      clearable
    />
  );
};
