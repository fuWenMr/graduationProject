import styled from 'styled-components';

export const Wrapper = styled.div`
  background: rgb(235, 236, 236);

  ul {
    margin: 12px;
    li {
      margin: 5px 0px;
      padding: 12px;
      border-radius: 5px;
      background: lightgray;

      .msg_bottom {
        margin-top: 4px;
        height: 24px;
        line-height: 24px;
        .msg_btn {
          float: right;
        }
      }

    }
  }
`; 