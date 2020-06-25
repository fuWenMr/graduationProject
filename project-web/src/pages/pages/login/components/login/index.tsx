/**
 * Created by Mr.F
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connectAlita } from 'redux-alita';
import { RouteComponentProps } from 'react-router';
import umbrella from 'umbrella-storage';
import { RENCET_LOGIN } from '~/utils/constant/storageKey';
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

  private remember = (remember: boolean, userName: string, password: string) => {
    umbrella.setLocalStorage(RENCET_LOGIN, { 
      userName: remember ? userName : '',
      password: remember ? password : '',
      remember,
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form!.validateFields((err, values) => {
      if (!err) {
        const { 
          userName,
          password,
          remember,
        } = values;

        const { setAlitaState } = this.props;

        this.setState({ loading: true });
        doLogin(userName, password).then((res: any) => {
          if (res.resType === 0) {
            const { user } = res;
            setStateData(setAlitaState, STATE_USER, { userName, ali: user.ali });
            this.remember(remember, userName, password);
            this.props.history.push('/app/data/index');
          } else {
            this.setState({errorMsg: res.msg || '登陆失败'})
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
      loading,
      errorMsg,
    } = this.state;
    const { getFieldDecorator } = this.props.form!;
    // 上次登录的记住值
    const recentLogin = umbrella.getLocalStorage(RENCET_LOGIN) || {};
    return (
      <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>

        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              { required: true, message: '请输入email' },
              { type: 'email', message: '不是合法email' }
            ],
            initialValue: recentLogin.userName || '',
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
            initialValue: recentLogin.password || '',
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
            initialValue: recentLogin.remember,
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
