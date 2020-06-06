
import styled from 'styled-components';

export const Wrapper = styled.div`
  
  .pv_count_time_view {
    display: flex;
    .page_radio {
      width: 200px;
      flex: 1 0 0 auto;
      .title {
        font-weight: 600;
        font-size: 16px;
      }
      .page_list {
        max-height: 310px;
        width: 215px;
        overflow: overlay;
        li {
          cursor: pointer;
          height: 30px;
          padding: 6px;
          margin: 4px 0;
          background-color: #f6fafe;
          width: 210px;
          word-break: break-all;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover, &.active_page {
            background-color: #e6f9fc;
            font-weight: 600;
          }
        }
      }
    }
    .chart_view {
      flex: 1 1 0 ;
      min-width: 0px;
    }
  }

  .distribution_view {
      

      .distribution_view_guide {
        pointer-events: none;
        color:#8c8c8c;
        font-size:1.16em;
        text-align: center;
        width: 10em;
        line-height:1;
        .guide_num {
          color:#262626;
          font-size:2.2em
        }
      }

      .pv_view {

      }
      .uv_view {

      }
      .all_page_view {

      }
    }

`;