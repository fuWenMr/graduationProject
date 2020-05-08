/**
 * Created by Mr.F
 */
import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { getResetCaptcha, doReset } from '~/ajax';
import CaptchaButton from '../captchaButton';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  changeType: any,
};

class LoginPanel extends React.Component<Props & FormComponentProps> {
  userEmail: any;
  state = {
    able2Captcha: false,
    errorMsg: '',
    loading: false,
  };

  private onEmailChange = (e: any) => {
    const value = e.target.value;
    const {
      able2Captcha
    } = this.state;

    // 输入为邮箱格式才可以发验证码
    // eslint-disable-next-line
    const preAble2Captcha = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value);
    if (able2Captcha === preAble2Captcha) {
      return ;
    } else {
      this.setState({ able2Captcha: preAble2Captcha });
    }
    this.userEmail = value;
  }


  private reset = (values: any) => {

    const { changeType } = this.props;
    const {
      userName,
      password,
      captcha
    } = values

    this.setState({loading: true});

    // 发送请求
    doReset(userName, password, captcha).then((res: any) => {
      if (res.resType === 0) {
        // 重置成功
        Modal.success({
          title: '密码重置成功',
          okText: '前往登录',
          onOk: changeType.toLogin, 
        });
      } else if (res.resType === 1) {
        this.setState({ errorMsg: res.errMsg || '重置失败' });
      }
    }).finally(() => {
      this.setState({ loading: false });
    });

  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form!.validateFields((err, values) => {
      if (err) {
        return ;
      }
      if (values.password !== values.passwordCheck) {
        this.setState({
          errorMsg: '两次输入的密码不一致',
        });
        return;
      }

      this.reset(values);
    });
  };

  private getCaptcha = () => {
    // 清空提示栏
    this.setState({ errorMsg: '' });
    let errorMsg = '验证码发送失败，请重试';
    getResetCaptcha(this.userEmail).then((res: any) => {
      if (res.resType === 0) {
        errorMsg = '';
      } else if (res.resType === 1) {
        errorMsg = res.errMsg;
      }
    }).finally(() => {
      this.setState({ errorMsg });
    });
  }
  

  render() {
    const { 
      changeType,
    } = this.props;
    const {
      able2Captcha,
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
              { type: 'email', message: '不是合法email' },
            ],
          })(
            <Input
              onChange={this.onEmailChange}
              type="email"
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="请输入你的email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入验证码!' }],
          })(
            <>
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="请输入验证码"
                style={{width: '140px'}}
              />
              <CaptchaButton
                disabled={!able2Captcha}
                onClick={this.getCaptcha}
              />
            </>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入新的密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="请输入新的密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passwordCheck', {
            rules: [{ required: true, message: '请再次输入新密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="请再次输入新密码"
            />
          )}
        </FormItem>

        <FormItem>
          {errorMsg && <div className="error_message">{errorMsg}</div>}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
            loading={loading}
          >
            重置密码
          </Button>
          <div>
          { /* eslint-disable-next-line*/}
            <a href="javascript:;" onClick={changeType.toLogin}>返回登陆</a>
          </div>
        </FormItem>

    
      </Form>
    );
  }
}

export default Form.create<Props>()(LoginPanel);
