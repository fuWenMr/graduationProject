import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Input,
  Form,
  message,
} from 'antd';
import { FormProps } from 'antd/lib/form';

import { createApp } from '~/ajax';


const formItemLayout = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class CreateButtonWithModal extends React.Component<FormProps> {
  state = {
    modalVisible: false,
    confirmLoading: false,
  }

  private showModal = () => {
    this.setState({ modalVisible: true });
  };
  private hideModal = () => {
    this.setState({ modalVisible: false });
  }

  private handleOk = () => {
    this.props.form!.validateFields((err, values) => {
      if (err) {
        return ;
      }
      console.log(values);
      const {
        appName,
        appInfo
      } = values;
      this.setState({ confirmLoading: true });
      createApp(appName, appInfo).then((res: any) => {
        console.log(res);
        if (res.resType === 0) {
          window.location.reload();
          return ;
        }
        message.error('应用创建失败');
        
      }).finally(() => {
        this.setState({ confirmLoading: false });
      });

    });
  }

  render () {
    const { getFieldDecorator } = this.props.form!;
    const {
      modalVisible,
      confirmLoading,
    } = this.state;
    return <>
      <Button
        className="btn btn_create"
        onClick={this.showModal}
      >
        创建应用 <Icon type="plus" />
      </Button>
      <Modal
        title="创建新应用"
        centered
        okText="确认创建"
        cancelText="取消"
        visible={modalVisible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.hideModal}
      >
        <Form {...formItemLayout}>
          <Form.Item label="应用名称">
            {getFieldDecorator('appName', {
              rules: [{ required: true, message: '项目名不能为空' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="应用描述">
            {getFieldDecorator('appInfo', {})(<Input.TextArea placeholder="该应用的简要描述" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  }
}

export default Form.create()(CreateButtonWithModal);
