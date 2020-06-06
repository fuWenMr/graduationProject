import React from 'react';
import { Button, Input, Modal } from 'antd';
import { connectAlita } from 'redux-alita';
import {
  STATE_CURRENT_APP,
  // STATE_APP_LIST,
} from '~/redux/reduxStateName';
import { 
  setStateData,
  clone,
 } from '~/utils';
import {
  bindUrl,
  deletApp,
} from '~/ajax';
import { Wrapper } from './styled';

class MoreSetter extends React.PureComponent<any> {
  state = {
    able2bind: false,
    bindWaring: '',
    isBindLoading: false,
    able2delete: false,
    isDeleteLoading: false,
  };

  domainInput = React.createRef() as React.RefObject<any>;

  private allowBind = () => {
    this.setState({
      able2bind: true,
    });
  };

  private handleBind = () => {
    const value = this.domainInput.current.input.value;
    const currentAPP = clone(this.props[STATE_CURRENT_APP].data);
    const { setAlitaState } = this.props;
    // eslint-disable-next-line
    if (!/^([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(value)) {
      this.setState({
        bindWaring: '根域名不合法',
      });
      return ;
    }

    this.setState({ isBindLoading: true });
    bindUrl(currentAPP.id, value).then((res: any) => {
      if (res.resType === 0) {
        currentAPP.bindUrl = res.bindUrl;

        setStateData(setAlitaState, STATE_CURRENT_APP, currentAPP);
        this.setState({ able2bind: false });
      }
      this.setState({ bindWaring: res.msg || '绑定失败'});
    }).then(() => {
      this.setState({ isBindLoading: false });
    });

  };

  private handleDeleteCheck = (e: any) => {
    const { able2delete } = this.state;
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    const isCurrentName = !!(currentApp && e.target.value === currentApp.appName);
    if ( able2delete !== isCurrentName) {
      this.setState({ able2delete: isCurrentName});
    }
  };

  private doDelApp = () => {
    // const { setAlitaState } = this.props;
    this.setState({ isDeleteLoading: true });
    const currentAPP = clone(this.props[STATE_CURRENT_APP].data);
    deletApp(currentAPP.id).then((res: any) => {
      if (res.resType === 0) {
        // 删除成功后重置list 和 currentAPP
        console.log(res.apps);
        // setStateData(setAlitaState, STATE_APP_LIST, res.apps);
        // setStateData(setAlitaState, STATE_CURRENT_APP, res.apps[0]);
        window.location.reload();
        return ;
      }
    }).finally(() => {
      this.setState({ isDeleteLoading: false });
    });
  }

  private handleDel = () => {
    const currentAPP = clone(this.props[STATE_CURRENT_APP].data);
    Modal.confirm({
      title: `你确定要删除应用 ${currentAPP.appName}吗？`,
      cancelText: '不可不可',
      okText: '注意已定',
      okType: 'danger',
      content: `此操作不可撤销`,
      onOk: this.doDelApp,
    });
  }

  render() {
    const {
      able2bind,
      bindWaring,
      isBindLoading,
      able2delete,
      isDeleteLoading,
    } = this.state;

    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    return (
      <Wrapper>
        <div className="operate_item">
          <h1>根域名绑定</h1>
          <p>
            绑定根域名之后,来自其它域名下站点的数据会被忽略(即使存在wid),一般来说不必进行此操作,同一时间只允许绑定一个域名
          </p>
          <p>
            当前绑定域名: 
            {(currentApp && currentApp.bindUrl) ? currentApp.bindUrl : '未绑定'}
          </p>
          {able2bind ? (
            <>
              <div className="input">
                <Input
                  ref={this.domainInput}
                  maxLength={50}
                  style={{ maxWidth: '700px' }}
                  placeholder="输入你想绑定的根域名"
                />
              </div>
              <Button
                type="primary"
                onClick={this.handleBind}
                loading={isBindLoading}
              >
                绑定新的跟域名
              </Button>
              {bindWaring && <span className="waring_tip">{bindWaring}</span>}
            </>
          ) : (
            <Button type="primary" onClick={this.allowBind}>
                绑定新的跟域名
            </Button>
          )
        }
        </div>

        <div className="operate_item delete">
          <h1>删除项目</h1>
          <p className="warning">
            警告: 除非是私有化部署项目, 否则该操作造成的数据损失完全不可撤销,
            如果确认要删除,请在下面的输入框中输入项目名
          </p>
          <div className="input">
            <Input
              maxLength={50}
              style={{ maxWidth: '700px' }}
              placeholder="输入正确的项目名"
              onChange={this.handleDeleteCheck}
            />
          </div>
          <Button
            type="danger"
            loading={isDeleteLoading}
            disabled={!able2delete}
            onClick={this.handleDel}
          >
            删除项目
          </Button>
        </div>
      </Wrapper>
    );
  }
}

export default connectAlita([STATE_CURRENT_APP])(MoreSetter);
