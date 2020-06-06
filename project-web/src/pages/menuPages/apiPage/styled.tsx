import styled from 'styled-components';

export const Wrapper = styled.div`

  background: white;
  display: flex;
  /* left */
  .api_list {
    width: 360px;
    height: 100%;

    .sort_select {
      font-size: 12px;
      font-weight: 400;
    }
    .api_list_area {
      max-height: 730px;
      overflow-y: overlay;
      margin: 10px 0px 20px 0;
      padding-right: 20px;

      li {
        margin: 5px 0;
        padding: 8px;
        background-color: #f6fafe;
        cursor: pointer;

        &:hover, &.active {
          background-color: #e6f9fc;
          font-weight: 600;
        }

      .api_src{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        direction: rtl;
        }
      }

      .api_data {
        font-size: 12px;
      }
      
    }
  }

  /* right */
  .api_item_data{
    min-width: 600px;
    flex: 1 1 0;
  }
`;