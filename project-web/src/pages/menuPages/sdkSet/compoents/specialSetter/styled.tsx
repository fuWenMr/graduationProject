import styled from 'styled-components';

export const SpecialConfigWrapper = styled.div`
    .top_tip {
        font-size: 13px;
        color: #373d41;
        .title_tip {
            color: rgb(180, 180, 180);
        }
    }

    .config {
        margin: 20px 14px;

        h1 {
            color: rgb(55, 61, 65);
            margin: 10px 0;
            font-weight: 600;
            font-size: 17px;
        }

        .config_content {
            margin: 5px 8px;
        }

        .wid {
            width: fit-content;
            font-weight: 600;
            line-height: 35px;
            height: 35px;
            background: rgb(240, 240, 240);
            padding: 0 20px;
            color: rgb(215, 216, 217);
            font-size: 15px;
        }

        .tip {
            font-weight: 600;
            color: black;
            font-size: 13px;
            margin: 7px 0;
        }
    }
`;
