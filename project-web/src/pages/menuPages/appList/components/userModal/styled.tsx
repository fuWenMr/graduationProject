import styled from 'styled-components';

export const Wrapper = styled.div`

  .left,.right {
    display: inline-block;
    min-height: 300px;
    max-height: 500px;
    width: 280px;
    margin: 12px;
    overflow: overlay;
    border: 1px solid rgba(200,200,200,0.5);
    border-radius: 6px;

    .user_item, .user_item_choose {
      display: block;
      height: 42px;
      padding-top: 2px; 
      max-width: 255px;
      border-radius: 6px;
      margin: 6px auto; 
      font-size: 15px;
      line-height: 36px;

      .user_name {
        margin-left: 8px;
      }
    }
    .user_item {
      cursor: pointer;
      height: 42px;
      padding-top: 2px; 

      &:hover {
        color: #fa541c;
        background: #fff2e8;
        border-color: #ffbb96;
      }

      .user_name {
        margin-left: 8px;
        font-size: 12px;
      }
    }
  }
  .btn_area {
    height: 52px;
    button {
      float: right;
      margin: 12px;
    }
    .boss_btn {

    }
  }
`;  