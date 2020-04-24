import styled from 'styled-components';

let Wrapper = styled.div`
    width: 100%;
    height: 100%;
    align-items: center;
    text-align: center;

    .half {
        display: inline-block;
        width: 50%;
    }
    .vertical_line {
        position: absolute;
        left: 50%;
        top: 40px;
        background: #eee;
        height: 20px;
        width: 1px;
        margin: 0 10px;
    }

    .data {
        font-size: 28px;
        line-height: 33px;
        font-weight: 700;
        color: #373d41;
    }
    .data_title {
        margin-top: 8px;
        font-weight: 700;
        font-size: 12px;
        color: #9b9ea0;
    }
    .data_change {
        margin-top: 20px;
        font-size: 12px;
        color: #9b9ea0;
    }
    .data_change_good {
        color: #38c58d;
    }
    .data_change_waring {
        color: #e55130;
    }
`;

export default Wrapper;
