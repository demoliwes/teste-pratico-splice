import React, { useMemo } from 'react';

import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { PageChangerTypes } from '..';
import { PageChangerContainer } from './styles';


interface IPageChangerProps {
  currentPage: number;
  totalCountOfRegisters: number;
  onPageChange: (page: number) => void;
  type: PageChangerTypes;
  registerPerPage: number;
}

const PageChanger: React.FC<IPageChangerProps> = ({
  currentPage,
  totalCountOfRegisters,
  onPageChange,
  registerPerPage,
  type
}) => {
  const isIncreasePossible = useMemo(
    () => !(currentPage + 1 > Math.ceil(totalCountOfRegisters / registerPerPage) - 1),
    [currentPage, totalCountOfRegisters]
  );
  const isDecreasePossible = useMemo(
    () => !(currentPage - 1 < 0),
    [currentPage]
  );

  function handleChangePage() {
    if (isIncreasePossible && type === PageChangerTypes.INCREASE) {
      onPageChange(currentPage + 1);
    }
    if (isDecreasePossible && type === PageChangerTypes.DECREASE) {
      onPageChange(currentPage - 1);
    }
  }
  return (
    <PageChangerContainer
      onClick={() => handleChangePage()}
      disabled={type === PageChangerTypes.DECREASE ? !isDecreasePossible : !isIncreasePossible}
    >
      {type === PageChangerTypes.INCREASE ? (
        <HiArrowRight size={22} />
      ) : (
        <HiArrowLeft size={22} />
      )}
    </PageChangerContainer>
  );
};


export default PageChanger