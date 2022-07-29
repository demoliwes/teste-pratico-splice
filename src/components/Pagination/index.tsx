import React, { useMemo } from 'react';
import PageChanger from './PageChanger';
import PaginationItem from './PaginationItem';

import { PaginationContainer, PaginationPagesWrapper } from './styles';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export enum PageChangerTypes {
  INCREASE,
  DECREASE
};


const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0);
}

const Pagination: React.FC<PaginationProps> = ({
  totalCountOfRegisters,
  registersPerPage = 15,
  currentPage = 0,
  onPageChange
}) => {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage) - 1;
  const siblingsCount = useMemo<number>(() => { return 10; }, [])
  const previousPages =
    currentPage > 0
      ? generatePagesArray(currentPage + 1 - siblingsCount, currentPage)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
        currentPage,
        Math.min(currentPage + siblingsCount, lastPage)
      )
      : [];

  return (
    <PaginationContainer>
      <PaginationPagesWrapper>
        <PageChanger
          registerPerPage={registersPerPage}
          totalCountOfRegisters={totalCountOfRegisters}
          currentPage={currentPage}
          onPageChange={onPageChange}
          type={PageChangerTypes.DECREASE}
        />


        {previousPages.length > 0 &&
          previousPages.map(page => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map(page => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}

        <PageChanger
          registerPerPage={registersPerPage}
          totalCountOfRegisters={totalCountOfRegisters}
          currentPage={currentPage}
          onPageChange={onPageChange}
          type={PageChangerTypes.INCREASE}
        />
      </PaginationPagesWrapper>

      <div>
        <strong>{totalCountOfRegisters === 0 ? 0 : (currentPage) * registersPerPage + 1}</strong> -{' '}
        <strong>
          {lastPage === currentPage
            ? totalCountOfRegisters
            : currentPage * registersPerPage > totalCountOfRegisters
              ? totalCountOfRegisters
              : totalCountOfRegisters === 0 ? 0 : currentPage * registersPerPage + registersPerPage}
        </strong>{' '}
        de <strong>{totalCountOfRegisters}</strong>
      </div>

    </PaginationContainer>
  );
};

export default Pagination