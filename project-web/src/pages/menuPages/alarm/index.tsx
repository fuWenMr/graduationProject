import React from 'react';
import {
  Card,
} from 'antd';
import { connectAlita } from 'redux-alita';
import {
  STATE_CURRENT_APP
} from '~/redux/reduxStateName';
import AddBtn from './compoents/addBtnWithBtn';
import AlarmList from './compoents/warningList';
import AlarmModal from './compoents/warningModal';
import { Wrapper } from './styled';

class AlarmPage extends React.Component<any> {

  state = {
    modalVisible: false,
    modalAlarm: undefined,
  };

  private showModal = (alarm?: any) => {
    this.setState({
      modalVisible: true,
      modalAlarm: alarm,
    });
  }
  private hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  }

  render () {
    const {
      modalVisible,
      modalAlarm,
    } = this.state;
    let appId = '';
    const app = this.props[STATE_CURRENT_APP];
    if (app && app.data) {
      appId = app.data.id ? app.data.id : appId
    }
    
    return (
      <Wrapper>
        <Card
          bodyStyle={{
            minHeight: '800px',
          }}
          title={( 
            <AddBtn
              onClick={this.showModal}
            />
          )}
          bordered
        >
          <AlarmModal
            appId={appId}
            visible={modalVisible}
            hide={this.hideModal}
            warning={modalAlarm}
          />
          <AlarmList
            appId={appId}
            onItemClick={this.showModal}
          />
        </Card>
      </Wrapper>
    );
  }
}

export default connectAlita([STATE_CURRENT_APP])(AlarmPage);