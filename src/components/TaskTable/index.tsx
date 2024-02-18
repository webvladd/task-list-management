import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Select,
  rem,
  Button
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconDatabaseOff,
  IconBucketOff
} from '@tabler/icons-react';

import { RowData, Task, FilterState, SortPayload, ThProps } from '../../types';

import s from './TaskTable.module.scss';

const statusOptions = [
  { label: 'Все', value: 'Все' },
  { label: 'готова к работе', value: 'готова к работе' },
  { label: 'взята в работу', value: 'взята в работу' },
  { label: 'выполнена', value: 'выполнена' }
];

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filterState, setFilterState] = useState<FilterState>({
    taskName: '',
    description: '',
    ownerName: '',
    status: '',
    deadlineFrom: null,
    deadlineTo: null
  });

  const [sortedData, setSortedData] = useState(tasks);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(filterState, { sortBy: field, reversed }));
  };

  const handleSearchChange = (updatedState: FilterState) => {
    setSortedData(
      sortData(updatedState, {
        sortBy,
        reversed: reverseSortDirection
      })
    );
  };

  const filterData = (updatedState: FilterState, payload: SortPayload) => {
    let result = tasks.filter((item) => {
      return Object.keys(updatedState).every((property) => {
        if (property === 'deadlineFrom') {
          const deadlineFromTime = new Date(
            updatedState.deadlineFrom ? updatedState.deadlineFrom : 0
          ).getTime();

          if (deadlineFromTime === 0) {
            return true;
          } else {
            return deadlineFromTime < new Date(item.deadline).getTime();
          }
        } else if (property === 'deadlineTo') {
          const deadlineToTime = new Date(
            updatedState.deadlineTo ? updatedState.deadlineTo : 0
          ).getTime();

          if (deadlineToTime === 0) {
            return true;
          } else {
            return deadlineToTime > new Date(item.deadline).getTime();
          }
        } else {
          if (
            property in updatedState &&
            typeof updatedState[property as keyof FilterState] === 'string'
          ) {
            const stringValue = updatedState[
              property as keyof FilterState
            ] as string;
            return (item[property as keyof Task] as string)
              .toLowerCase()
              .includes(stringValue.toLowerCase());
          }
        }
      });
    });

    if (typeof payload.sortBy === 'string' && payload.sortBy !== null) {
      result = [...result].sort((a, b) => {
        const sortBy = payload.sortBy as keyof Task;
        if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
          const aValue = a[sortBy] as string;
          const bValue = b[sortBy] as string;
          if (payload.reversed) {
            return bValue.localeCompare(aValue);
          }
          return aValue.localeCompare(bValue);
        }

        return 0;
      });
    }

    return result;
  };

  const sortData = (
    filterState: FilterState,
    payload: { sortBy: keyof RowData | null; reversed: boolean }
  ) => {
    return filterData(filterState, payload);
  };

  const handleDelete = (idTask: string) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== idTask;
    });
    setTasks(filteredTasks);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  };

  const rows = sortedData.map(
    ({ id, taskName, description, ownerName, deadline, status }) => (
      <Table.Tr key={id}>
        <Table.Td>{taskName}</Table.Td>
        <Table.Td>{description}</Table.Td>
        <Table.Td>{ownerName}</Table.Td>
        <Table.Td>{dayjs(deadline).format('DD.MM.YYYY')}</Table.Td>
        <Table.Td>{status}</Table.Td>
        <Table.Td>
          <Link className={s.change_btn} to={`/${id}`}>
            Изменить
          </Link>
        </Table.Td>
        <Table.Td>
          <Button
            type='button'
            color='red'
            title='Удалить'
            onClick={() => handleDelete(id)}
          >
            <IconBucketOff
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          </Button>
        </Table.Td>
      </Table.Tr>
    )
  );

  const Th = ({ children, minWidth, reversed, sorted, onSort }: ThProps) => {
    const Icon = sorted
      ? reversed
        ? IconChevronUp
        : IconChevronDown
      : IconSelector;
    return (
      <Table.Th className={s.th} style={{ minWidth: `${minWidth}px` }}>
        <UnstyledButton onClick={onSort} className={s.control}>
          <Group justify='space-between'>
            <Text fw={500} fz='sm'>
              {children}
            </Text>
            <Center className={s.icon}>
              <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      </Table.Th>
    );
  };

  return (
    <section className={s.task_table}>
      <ScrollArea className={s.task_table_wrap}>
        {tasks.length > 0 ? (
          <>
            <div className={s.task_table_filters}>
              <TextInput
                placeholder='По названию'
                leftSection={
                  <IconSearch
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                value={filterState.taskName}
                onChange={(e) => {
                  setFilterState((prevState) => {
                    const updatedState = {
                      ...prevState,
                      taskName: e.target.value
                    };
                    handleSearchChange(updatedState);
                    return updatedState;
                  });
                }}
              />

              <TextInput
                placeholder='По описанию'
                leftSection={
                  <IconSearch
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                value={filterState.description}
                onChange={(e) => {
                  setFilterState((prevState) => {
                    const updatedState = {
                      ...prevState,
                      description: e.target.value
                    };
                    handleSearchChange(updatedState);
                    return updatedState;
                  });
                }}
              />

              <TextInput
                placeholder='По владельцу'
                leftSection={
                  <IconSearch
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                value={filterState.ownerName}
                onChange={(e) => {
                  setFilterState((prevState) => {
                    const updatedState = {
                      ...prevState,
                      ownerName: e.target.value
                    };
                    handleSearchChange(updatedState);
                    return updatedState;
                  });
                }}
              />

              <DateInput
                placeholder='Выберите дату от'
                valueFormat='DD.MM.YYYY'
                clearable
                value={filterState.deadlineFrom}
                onChange={(value) => {
                  setFilterState((prevState) => {
                    const updatedState = {
                      ...prevState,
                      deadlineFrom: value
                    };
                    handleSearchChange(updatedState);
                    return updatedState;
                  });
                }}
              />

              <DateInput
                placeholder='Выберите дату до'
                valueFormat='DD.MM.YYYY'
                clearable
                value={filterState.deadlineTo}
                onChange={(value) => {
                  setFilterState((prevState) => {
                    const updatedState = {
                      ...prevState,
                      deadlineTo: value
                    };
                    handleSearchChange(updatedState);
                    return updatedState;
                  });
                }}
              />

              <Select
                placeholder='По статусу'
                data={statusOptions}
                value={filterState.status}
                onChange={(value) => {
                  setFilterState((prevState) => {
                    const updatedState = {
                      ...prevState,
                      status: value === 'Все' ? '' : value
                    };
                    handleSearchChange(updatedState);
                    return updatedState;
                  });
                }}
              />
            </div>

            <Table horizontalSpacing='md' verticalSpacing='xs' miw={1000}>
              <Table.Tbody>
                <Table.Tr>
                  <Th
                    minWidth='124'
                    sorted={sortBy === 'taskName'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('taskName')}
                  >
                    Название
                  </Th>

                  <Th
                    sorted={sortBy === 'description'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('description')}
                  >
                    Описание
                  </Th>

                  <Th
                    minWidth='124'
                    sorted={sortBy === 'ownerName'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('ownerName')}
                  >
                    Владелец
                  </Th>

                  <Th
                    minWidth='120'
                    sorted={sortBy === 'deadline'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('deadline')}
                  >
                    Дедлайн
                  </Th>

                  <Th
                    minWidth='120'
                    sorted={sortBy === 'status'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('status')}
                  >
                    Статус
                  </Th>

                  <Table.Th style={{ width: '100px' }} />
                  <Table.Th style={{ width: '70px' }} />
                </Table.Tr>
              </Table.Tbody>
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={Object.keys(tasks[0]).length}>
                      <Text fw={500} ta='center'>
                        Ничего не найдено
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </>
        ) : (
          <div className={s.no_data}>
            <div className={s.no_data_text}>
              <p>Нет данных</p>
              <IconDatabaseOff
                style={{ width: rem(60), height: rem(60) }}
                stroke={1.5}
              />
            </div>

            <Link className={s.no_data_btn} to='/create-task'>
              Добавить
            </Link>
          </div>
        )}
      </ScrollArea>
    </section>
  );
};

export default TaskTable;
