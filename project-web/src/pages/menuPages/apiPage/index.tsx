import React from 'react';
import { connectAlita } from 'redux-alita';
import {
  STATE_CURRENT_APP,
} from '~/redux/reduxStateName';

import Left from './components/left';
import Right from './components/right';

import { Wrapper } from './styled';

class ApiPage extends React.Component<any> {
  state = {
    activeApi: '',
  };

  private handleApiChange = (a: string) => {
    if (a !== this.state.activeApi) {
      this.setState({
        activeApi: a,
      });
    }
  }

  render() {
    const {
      activeApi
    } = this.state;
    const app = this.props[STATE_CURRENT_APP];
    // eslint-disable-next-line
    const appId = app && app.data && app.data.id || '';
    return (
      <Wrapper>
        <Left chooseApi={this.handleApiChange} activeApi={activeApi} appId={appId} />
        <Right appId={appId} activeApi={activeApi} />
      </Wrapper>
    );
  }
}

export default connectAlita([STATE_CURRENT_APP])(ApiPage);
