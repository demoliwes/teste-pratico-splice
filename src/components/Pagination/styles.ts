import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;

  & > div:last-child {
    margin-left: 8px;
    margin-top: 8px;
  }
`;

export const PaginationPagesWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    width: 35px;
    height: 35px;

    text-align: center;
    display: flex;

    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
  }

  & > {
    margin: 0 8px;
  }
`;
