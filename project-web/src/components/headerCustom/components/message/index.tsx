import React from 'react';
import {
  Button,
  // message,
} from 'antd';

import {
  allowJoin,
} from '~/ajax'; 

type IProps = {
  message: {
    userName: string,
    appId: string,
    active: number,
    createdAt: string,
    updatedAt: string,
    App: any,
  } & any,
  readMessage: () => void
};


class Message extends React.Component<IProps> {
  state = {
    rejectLoading: false,
    allowLoading: false,
    resTip: '',
  }
  
  private loadingAllow = () => {
    this.setState({
      allowLoading: true,
    });
  };
  private loadingReject = () => {
    this.setState({
      rejectLoading: true,
    });
  };
  private loadingDone = () => {
    this.setState({
      allowLoading: false,
      rejectLoading: false,
    });
  };
  private setResTip = (str: string) => {
    this.setState({
      resTip: str,
    });
  }

  private allowJoin = () => {
    const {
      userName,
      appId
    } = this.props.message;
    this.loadingAllow();
    allowJoin(appId, userName).then((res: any) => {
      if (res.resType === 0) {
        this.setResTip('已同意');
        this.props.readMessage();
        return ;
      }
    }).finally(() => {
      this.loadingDone();
    });
  }

  render() {
    const {
      message,
    } = this.props;
    const {
      resTip,
      rejectLoading,
      allowLoading,
    } = this.state;
    const {
      active,
      userName,
      updatedAt,
      // appId,
      App,
    } = message;
    console.log('msg', message);
    return <li>
      {
        active === 1 && <>
          <div>
            {`用户 ${userName} 申请加入 项目 ${App.appName}`}
          </div>
          <div className="msg_bottom">
            <span>
              {(new Date(updatedAt) as any).toString('yyyy-MM-dd hh:mm:ss')}
            </span>
            <div className="msg_btn">
              {
                resTip
                ? <Button size="small" shape="round" disabled>{resTip}</Button>
                : <>
                    <Button
                      size="small"
                      type="danger"
                      shape="round"
                      loading={rejectLoading}
                      disabled={allowLoading}
                    >
                      拒绝
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      shape="round"
                      onClick={this.allowJoin}
                      loading={allowLoading}
                      disabled={rejectLoading}
                    >
                      同意
                    </Button>
                  </>
              }
            </div>
          </div>
        </>
      }
    </li>
  }
}

export default Message;
