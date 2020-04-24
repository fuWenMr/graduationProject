import styled from 'styled-components';

export const Wrapper = styled.div`
    h1 {
        font-weight: 600;
    }

    .operate_item {
        border: 1px solid #e1e4e8;
        border-radius: 2px;
        padding: 16px;
        margin: 16px 0;

        &.delete {
            border-color: #d73a49;
            h1 {
                color: #ff7875;
            }

            .warning {
                font-size: 12px;
                margin: 2px 0;
                color: #ff7875;
            }
        }

        .input {
            margin-bottom: 18px;
        }

        .waring_tip {
            color: #ff7875;
            margin-left: 2em;
        }
    }
`;
