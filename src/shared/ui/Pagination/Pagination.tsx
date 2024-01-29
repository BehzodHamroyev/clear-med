import React from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import cls from './Pagination.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface PaginationComponentProps {
  count: number;
}

const PaginationComponent = ({ count }: PaginationComponentProps) => {
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    console.log(pageNumber);
  };

  return (
    <div className={classNames(cls.Pagination)}>
      <Stack spacing={1}>
        <Pagination
          count={count}
          variant="outlined"
          shape="rounded"
          onChange={(e, pageNumber) => handlePagination(e, pageNumber)}
        />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
