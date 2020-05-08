import styled from 'styled-components';

export const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f3f3f3;

  .error_message {
    color: #f5222d!important;
  }

  .login-form-forgot {
    float: right;
  }

  a {
    color: #1890ff;
  }

  .form_panel {
    min-width: 320px;
    padding: 36px 36px 6px 36px;
    box-shadow: 0 0 100px rgba(0,0,0,.08);
    background: #fff;
    border-radius: 12px;
    box-shadow: 4px 4px 12px gray;

    .logo {
      text-align: center;
      width: 100%;
      line-height: 40px;
      margin-bottom: 24px;
      vertical-align: text-bottom;
      font-size: 26px;
      font-weight: 800;
      text-transform: uppercase;
      display: inline-block;
      color: #313688;
    }
  }
`;