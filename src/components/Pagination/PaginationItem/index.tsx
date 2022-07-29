import React from 'react';

import { PaginationItemContainer } from './styles';

interface IPaginationItemProps {
  number: number;
  onPageChange: (page: number) => void;
  isCurrent?: boolean;
}

export const PaginationItem: React.FC<IPaginationItemProps> = ({
  number,
  onPageChange,
  isCurrent = false
}) => {
  return (
    <PaginationItemContainer
      isCurrent={isCurrent}
      onClick={() => onPageChange(number)}
    >
    </PaginationItemContainer>
  );
};
