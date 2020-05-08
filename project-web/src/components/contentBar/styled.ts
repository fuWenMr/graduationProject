import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  height: 50px;
  padding: 0 16px;
  border-bottom: 2px solid #D6DBDF;
  color: rgb(55, 61, 65);
  justify-content:space-between;
  align-items: center;

  .left {

    cursor: pointer;
    font-weight: 800;
    border-left: 2px solid #00c1de;
    padding-left: 10px;

    .appName {
      margin-right: 10px;
    }
  }
`;

 