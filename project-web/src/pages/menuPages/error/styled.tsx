import styled from 'styled-components';

export const Wrapper = styled.div`

  .js_error_list, .static_miss_list {
    border-radius: 8px;
    border: 1px solid rgb(225, 225, 225);
    li {
      border-bottom: 1px solid rgb(225, 225, 225);
      min-height: 50px;
      font-size: 14px;
      padding: 15px 10px 15px 10px;

      .error_type, .miss_url {
        cursor: pointer;
        color: #1890ff;
        font-size: 13px;
        font-weight: 600;
        display: inline-block;
        margin: 0 10px 0 10px;
      }

      .miss_url {
        cursor: inherit;
        .miss_url_text {
          cursor: pointer;
          color: #ff4d4f;
        }
      }

      .error_num {
        margin-left: 20px;
      }

      .last_time {
        float: right;
        margin-top: 2px;
        font-size: 12px;
        color: darkgray;
        font-style:italic;
      }
    }
  }

  .show_more_btn {
    color: #1890ff;
    text-align: center;
  }

  .tables table {
    font-size: 12px;
    .table_url {
      max-width: 100px;
      margin: 0;
    }

    .table_stack {
      word-break: break-all;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }

  }
`;
