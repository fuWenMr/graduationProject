import React, { ReactNode } from 'react';

import { queryString } from '~/utils';
import { systemName } from '~/utils/constant';

import LoginPanel from './components/login';
import ResetPanel from './components/reset';
import RegisterPanel from './components/register';

import { LoginPageWrapper } from './styled';

class LoginPage extends React.PureComponent {

  changeType: { toLogin: () => void; toReset: () => void; toRegister: () => void; };

  state = {
    type: 'login',
  }
  types = ['login', 'register', 'reset'];

  constructor(props: any) {
    super(props);
    this.state = this.initState();
    this.changeType = {
      toLogin: () => {this.setType('login')},
      toReset: () => {this.setType('reset')},
      toRegister: () => {this.setType('register')},
    };
  }

  private initState() {
    let type = queryString().type;

    type = this.types.includes(type) ? type : 'login';

    return { type };
  }

  private setType (type: string) {

    console.log('type:', type, this.types.includes(type) ? type : 'login' )

    this.setState({ type: this.types.includes(type) ? type : 'login' });
  }

  private getPanel = () => {
    const { type } = this.state;
    let panel: ReactNode;
    if (type === 'login') {
      panel = <LoginPanel changeType={this.changeType} />;
    } else if (type === 'reset') {
      panel = <ResetPanel changeType={this.changeType} />;
    } else {
      panel = <RegisterPanel changeType={this.changeType} />;
    }
    return panel;
  }

  render() {
    return <LoginPageWrapper className="login_page">
      <div className="form_panel">
        <h1 className="logo">{systemName}</h1>
        {this.getPanel()}
      </div>
    </LoginPageWrapper>
  }
}

export default LoginPage;
