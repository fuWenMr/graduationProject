import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  background-color: #ffffff;

  .bar_btns .btn {
    color: white;
     &.btn_create {
      border-style: solid;
      background-color: #0070cc;
      border-color: transparent;     
    }
    &.btn_create:hover {
        background-color: #005aa5;
      }
    &.btn_join {
      border-style: solid;
      background-color:  rgb(76, 217, 100);
      border-color: transparent;
    }
    &.btn_join:hover {
      background-color:  rgb(68, 195, 90);
    }
  }

  table td {
    color: rgb(51, 51, 51);
    font-size: 12px;

    .table_operate {
      .operate_item {
        cursor: pointer;
        display: inline-block;
        color: rgb(0, 112, 204);

        &.delete {
          color: red;
        }
      }
    }
  }
`;
