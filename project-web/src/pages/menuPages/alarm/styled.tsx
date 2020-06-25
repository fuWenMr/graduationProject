import styled from 'styled-components';

export const Wrapper = styled.div`
  .add_btn {
    border-style: solid;
    background-color:  rgb(76, 217, 100);
    border-color: transparent;
    color: white;

    &:hover, &:active, &:focus {
      background-color:  rgb(68, 195, 90);
      color: white;
    }
  }

  .alarm_item {
    background: #f5f5f5;
    margin: 8px 0;
    padding: 12px 20px;
    border-radius: 5px;
    font-size: 16px;

    .show_btn {
      float: right;
      cursor: pointer;
      margin-top: 6px;
      color: rgb(0,112,204);
    }

    &:hover .del_btn {
      display: unset;
    }
    .del_btn {
      margin-left: 24px;
      display: none;
      color: red;
      cursor: pointer;
    }

    .title {
      font-weight: 600;
      font-size: 24px;
      .title_type {
        font-size: 17px;
      }
    }

    .content {
      margin: 12px 0;
      .content_item {
        .item_key {
          margin-right: 6px;
        }
        .item_value {
          color: darkgray;
        }
        margin-right: 18px;
      }
    }
  }
`;