import styled from 'styled-components';

export const ProbelWrapper = styled.div`
    padding: 24px;

    h1 {
        color: #373d41;
        font-size: 16px;
        margin: 24px 0 20px;
        font-weight: 400;
        text-shadow: 0 0 0, 0 0 0;
    }

    .quick_click {
        margin-left: 1em;
        user-select: none;
        cursor: pointer;
    }

    .code_area {
        padding: 16px 24px;
        background: rgb(240, 240, 240);
        font-size: 10px;
        line-height: 14px;
        color: rgb(20, 20, 20);

        p {
            margin: 0;
        }
    }
`;
