/**
 * Created by Mr.F
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connectAlita } from 'redux-alita';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { FormProps } from 'antd/lib/form';
import { STATE_USER } from '~/redux/reduxStateName';
import { doLogin } from '~/ajax';
import { setStateData } from '~/utils';
// import umbrella from 'umbrella-storage';

const FormItem = Form.Item;
type LoginProps = {
  setAlitaState: (param: any) => void;
  auth: any;
  changeType: any;
} & RouteComponentProps &
  FormProps;
class LoginPanel extends React.Component<LoginProps> {
  state = {
    loading: false,
    errorMsg: '',
  };

  componentDidMount() {
    const { setAlitaState } = this.props;
    setAlitaState({ stateName: 'auth', data: null });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form!.validateFields((err, values) => {
      if (!err) {
        const { 
          userName,
          password,
        } = values;

        const { setAlitaState } = this.props;
        if (values.userName === 'admin' && values.password === 'admin')
          setAlitaState({ funcName: 'admin', stateName: 'auth' });
        else if (values.userName === 'guest' && values.password === 'guest')
          setAlitaState({ funcName: 'guest', stateName: 'auth' });
        else {
          this.setState({ loading: true });
          doLogin(userName, password).then((res: any) => {
            if (res.resType === 0) {
              console.log('登录成功, 准备跳转');
              setStateData(setAlitaState, STATE_USER, { userName });
              this.props.history.push('/app/data/index');
            } else {
              this.setState({errorMsg: res.msg || '登陆失败'})
            }
          }).finally(() => {
            this.setState({ loading: false });
          });
        }
      }
    });
  };

  render() {
    const { 
      changeType,
    } = this.props;
    const {
      loading,
      errorMsg,
    } = this.state
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
              placeholder="请输入email"
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          { /* eslint-disable-next-line*/}
          <a href="javascript:;" onClick={changeType.toReset} className="login-form-forgot">
            忘记密码
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            style={{ width: '100%' }}
          >
            登录
          </Button>
          {errorMsg && <div className="error_message">{errorMsg}</div>}
          <div>
          { /* eslint-disable-next-line*/}
          还没有账号？ <a href="javascript:;" onClick={changeType.toRegister}>立刻注册</a>
          </div>
        </FormItem>
      </Form>
    );
  }
}

export default connectAlita(['auth'])(Form.create()(withRouter(LoginPanel)));
