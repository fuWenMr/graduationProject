/**
 * Created by Mr.F
 */
import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';



import { doRegister } from '~/ajax';

const FormItem = Form.Item;

interface IProps extends FormComponentProps {
  changeType: any,
};

class LoginPanel extends React.PureComponent<IProps> {
  state = {
    errorMsg: '',
    loading: false,
  };

  private onRegister = () => {
    const { changeType } = this.props;
    Modal.success({
      title: '注册成功',
      content: '我们已经向你的邮箱发送了一封激活邮件，点击邮件中的链接正式激活你的账号',
      okText: '前往登录',
      onOk: changeType.toLogin, 
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    this.props.form!.validateFields((err, values) => {
      if (err) {
        return ;
      }
      
      if (values.password !== values.passwordCheck) {
        this.setState({
          errorMsg: '两次输入的密码不一致',
        });
      } else {
        this.setState({
          loading: true,
        });

        doRegister(values.userName, values.password, values.ali).then((data: any) => {
          console.log('待处理数据', data);
          if (data.resType === 0) {
            // 注册成功
            this.onRegister();
          } else {
            console.log('差不多失败');
            this.setState({ errorMsg: data.msg || '注册失败'});
          }
          }).finally(() => {
            this.setState({ loading: false });
        });
      }
    });
  };

  render() {
    const { 
      changeType,
    } = this.props;
    const {
      errorMsg,
      loading,
    } = this.state;

    const { getFieldDecorator } = this.props.form!;
    return (
      <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              { required: true, message: '请输入email' },
              { type: 'email', message: '不是合法email' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="请输入你的email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('ali', {
            rules: [{ required: true, message: '请输入名称!' }],
          })(
            <Input
              prefix={<Icon type="meh" style={{ fontSize: 13 }} />}
              placeholder="请输入你的名称"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passwordCheck', {
            rules: [{ required: true, message: '请再次输入密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="请再次输入密码"
            />
          )}
        </FormItem>

        <FormItem>
          { 
            errorMsg && <div className="error_message">{errorMsg}</div> 
          }
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
            loading={loading}
          >
            {
              loading ? '注册中' : '注册账户'
            }
          </Button>
          <div>
            <div>注册成功后会收到一封激活邮件</div>
          { /* eslint-disable-next-line*/}
            <a href="javascript:;" onClick={changeType.toLogin}>返回登陆</a>
          </div>
        </FormItem>

    
      </Form>
    );
  }
}

export default Form.create<IProps>()( LoginPanel );
