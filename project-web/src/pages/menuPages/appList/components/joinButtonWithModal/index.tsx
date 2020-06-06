import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Input,
  message,
  Empty,
  Descriptions,
} from 'antd';
import { ModalWrapper } from './styled';
import { getAppById, joinApp } from '~/ajax';

function AppDescriptions (props: {app: any}) {
  const { app } = props;
  return (
    <Descriptions
      title={`应用： ${app.appName}`}
      column={2}
      bordered
    >
      <Descriptions.Item label="负责人">{app.owner}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{(new Date(app.createdAt) as any).toString('yyyy-MM-dd hh:mm')}</Descriptions.Item>
      <Descriptions.Item label="wid" span={2}>{app.id}</Descriptions.Item>
      <Descriptions.Item label="简介" span={2}>{app.appInfo}</Descriptions.Item>
    </Descriptions>
  );
}

type Iprops = {
  apps: any[],
};
class JoinButtonWithModal extends React.Component<Iprops> {
  state = {
    modalVisible: false,
    able2search: false,
    inputValue: '',
    isSearching: false,
    able2Join: false,
    isJoining: false,
    app: null as any,
  }

  private showModal = () => {
    this.setState({modalVisible: true});
  };

  private handleClose = () => {
    this.setState({ modalVisible: false });
  }

  private handleInput = (e: any) => {
    const inputValue = e.target.value;
    console.log(inputValue, inputValue.length === 37)
    this.setState({
      inputValue,
      able2search: inputValue.length === 36,
    })
  }

  private handleJoin = () => {
    const { apps } = this.props;
    const { app } = this.state;
    if (!app) {
      message.warn('没有可以加入的应用');
      return;
    } else if (apps.find((item: any) => item.id === app.id)) {
      message.warning('你已经属于该项目的成员了');
      return;
    }
    this.setState({ isJoining: true });
    joinApp(app.id).then((res: any) => {
      if(res.resType === 0) {
        message.success('已发送申请');
        return ;
      }
      message.warn(res.msg || '申请失败 请刷新重试');
    }).finally(() => {
      this.setState({ isJoining: false });
    })
  }

  private handleSearch = () => {
    this.setState({ isSearching: true });
    const { inputValue: id } = this.state;
    getAppById(id).then((res: any) => {
      if(res.resType === 0) {
        this.setState({app: res.app})
      }
    }).finally(() => {
      this.setState({ isSearching: false })
    });
  }

  render () {
    const {
      modalVisible,
      able2search,
      inputValue,
      isSearching,
      isJoining,
      app,
    } = this.state;
    return <>
      <Button
        className="btn btn_join"
        onClick={this.showModal}
      >
        加入 <Icon type="plus" />
      </Button>
      <Modal
        title="查找应用并加入"
        visible={modalVisible}
        okText="申请加入"
        cancelText="关闭"
        confirmLoading={isJoining}
        onOk={this.handleJoin}
        onCancel={this.handleClose}
        width={600}
      >
        <ModalWrapper>
          <div className="search">
            <Input
              value={inputValue}
              onChange={this.handleInput}
              placeholder="输入你要加入的应用的WID"
            />
            <Button
              type="primary"
              disabled={!able2search}
              loading={isSearching}
              onClick={this.handleSearch}
            >
              搜索
            </Button>
          </div>
          <div className="res">
            {
              !app
              ? <Empty
                  description="没有对应的应用"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              : <AppDescriptions app={app} />
            }
          </div>
        </ModalWrapper>
      </Modal>
    </>
  }
}

export default JoinButtonWithModal;
