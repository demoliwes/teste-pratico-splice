import styled from 'styled-components';

export const PageChangerContainer = styled.button`
  background-color: #6F1A07;
  color: #fff;
  border-radius: 8px;

  padding: 12px 8px;

  margin: 0 8px;

  cursor: pointer;

  display: flex;

  align-items: center;
  justify-content: center;


  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
  &:not(:disabled)&:active {
    background-color: #99240A;
  }
`;
