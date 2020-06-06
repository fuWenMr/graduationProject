import React from 'react';
import { connectAlita } from 'redux-alita';
import {
  STATE_CURRENT_APP,
} from '~/redux/reduxStateName';

import ErrorChart from './components/errorChart';
import ErrorList from './components/errorList';
import ErrorDetail from './components/errorDetail';

import { Wrapper } from './styled';


class ApiPage extends React.Component<any> {

  render() {
    const app = this.props[STATE_CURRENT_APP];
    // eslint-disable-next-line
    const appId = app && app.data && app.data.id || '';
    return (
      <Wrapper>
        <ErrorChart appId={appId} />
        <ErrorList appId={appId} />
        <ErrorDetail appId={appId} />
      </Wrapper>
    );
  }
}

export default connectAlita([STATE_CURRENT_APP])(ApiPage);
