import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  min-height: 900px;
  .key_list {
    width: 300px;
    flex: 1 0 0 auto;
    background: white;

    .list_with_search {
      display: flex;
      flex-direction: column;
      height: 700px;
      .search_input {
        flex: 1 0 0 auto;
      }

      .res_list {
        flex: 1 1 0;
      }

      ul.custom_key_list {
        max-height: 730px;
        overflow-y: overlay;
        margin: 10px 0 20px 0;
        padding: 0;
        li {
          height: 40px;
          padding: 8px;
          margin: 4px 0;
          background-color: #f6fafe;
          width: 245px;
          line-height: 24px;
          word-break:break-all;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            background-color: #e6f9fc;
            font-weight: 600;
          }
        }
      }
    }

    .search_input {
      input {
        width: 200px;
        height: 30px;

      }
      .search_btn {
        font-size: 14px;
        background: #00c1de;
        border-color: #00c1de;
        color: #fff;
        cursor: pointer;
        width: 46px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
      }
    }
  }
  .custom_chart {
    min-width: 600px;
    flex: 1 1 0;
  }
`;