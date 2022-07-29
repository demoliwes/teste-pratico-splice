import styled, { css } from 'styled-components';

interface IPaginationItemProps {
  isCurrent?: boolean;
}

export const PaginationItemContainer = styled.button<IPaginationItemProps>`
  width: 16px;
  height: 16px;

  border-radius: 50%;

  margin: 0 8px;

  cursor: pointer;

  ${props =>
    props.isCurrent
      ? css`
          background-color: #6F1A07;
          color: #ffffff;
        `
      : css`
          background-color: #fff;
          color: #6F1A07;

          border: 1px solid #6F1A07;

          &:hover {
            background-color: #6F1A07;
            color: #ffffff;
          }
        `}
`;
