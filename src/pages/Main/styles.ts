import styled from 'styled-components';


export const SiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100vw;
    height: 100vh;
    background-color: #F7F3E3;
    align-items: flex-start;
    padding:  64px 128px;
  
    &>div:last-child{
        display: flex;
        width: 100%;
        justify-content: space-between;
        min-height: 520px;
    }
    .ButtonContainer{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom:8px;
    }
    .Icon{
        display: flex;
        cursor: pointer;
        color: #333333;
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-around; 
    flex-direction: column;
    th{
        display: flex;
        background-color: #023618;
        color: white;
        width: 100%;
        padding: 0px 8px;
    }
    .InputContainer{
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .FilterWrapper{
        display: flex;
        flex-direction: column;
        gap: 16px;
        background-color: #ECF0F1;
        p {
             margin-bottom: 8px;
        }
        button{
            background-color: #6F1A07;
            color: white;
            height: 32px;
        }
        button:active {
            background-color: #ECF0F1;
            color: black;
        }
    }`;

export const TableTitle = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid;
  background-color: #023618;
  color: white;
  p{
    margin: 8px 8px;
  }
`;

export const TableContainer = styled.div`
    height: fit-content;
    width: 550px;
    &>div:nth-child(odd){
        background: #ECF0F1;
    }
    background-color: white;
`;

export const CarTable = styled.div`  
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1px solid #808080;
    height: 32px;
    p{
        margin: 0px 8px;
    }
`;


export const PageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;