import React from 'react';
import {
  Form,
  Input,
  Modal,
  message,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { editApp } from '~/ajax';

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

interface IProps extends FormComponentProps {
  visible: boolean,
  app: any,
  hideEditMOdal: () => void,
};
class EditModal extends React.Component<IProps> {
  state = {
    confirmLoading: false,
  };

  private handleOk = () => {
    this.props.form!.validateFields((err, values) => {
      if (err) {
        return ;
      }
      const { app } = this.props;
      this.setState({ confirmLoading: true });
      editApp(app.id, values.appInfo).then((res: any) => {
        if (res.resType === 0) {
          message.success('修改成功', 0.5, () => {
            window.location.reload();
          });
          return ;
        }
        message.error('操作失败');
      }).finally(() => {
        this.setState({ confirmLoading: false });
      });
    });
  };


  render () {

    const {
      confirmLoading,
    } = this.state;
    console.log(this.props.app, this.props.app|| {})
    let {
      app,
      visible: modalVisible,
      hideEditMOdal= ()=> {}
    } = this.props;
    app = app || {}
    const { getFieldDecorator } = this.props.form!;

    return (
      <Modal
      title="编辑应用信息"
      centered
      okText="确认修改"
      cancelText="取消"
      visible={modalVisible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={hideEditMOdal}
    >
      <Form {...formItemLayout}>
        <Form.Item label="应用名称">
          {getFieldDecorator('appName', {
            initialValue: app.appName || '',
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="应用描述">
          {getFieldDecorator('appInfo', {
            initialValue: app.appInfo || '',
          })(<Input.TextArea placeholder="该应用暂无描述" />)}
        </Form.Item>
      </Form>
    </Modal>
    );
  }
}

export default Form.create<IProps>()(EditModal);
