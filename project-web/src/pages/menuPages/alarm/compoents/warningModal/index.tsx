import React from 'react';
import {
  Modal,
  Select,
  Form,
  Input,
  Icon,
  Radio,
} from 'antd';
import umbrella from 'umbrella-storage';
import { FormComponentProps } from 'antd/lib/form/Form';
import { setAlarm } from '~/ajax';
import { getRandomInt } from '~/utils'
import { ModalWarpper } from './styled';

type Waring = {
  id: string;
  type: string,
  name: string,
} 

interface IProps extends FormComponentProps {
  appId: string,
  visible: boolean,
  hide: () => void,
  warning?: Waring,
};
class AlarmModal extends React.Component<IProps> {
  state = {
    type: 'api',
    modalLoading: false,
  };

  componentDidMount() {
    const { warning } = this.props;
    if (warning && warning.type !== 'api') {
      this.setState({
        type: warning.type,
      })
    }
  }
  componentDidUpdate(prevProps: IProps) {
    const { warning = {} as Waring } = this.props;
    const { type } = this.state;
    if (prevProps.warning && prevProps.warning.type === warning.type ) {
      return ;
    } else if (!prevProps.warning && !warning.type ) {
      return;
    }
    if (!warning.type) {
      if (type === 'api') {
        return;
      } else {
        this.setState({
          type: 'api'
        })
      }
      return ;
    } else if (warning.type !== type) {
      this.setState({
        type: warning.type,
      });
    }
  }
  
  private changeType = (value: string) => {
    const { warning = {} as Waring } = this.props;
    if( warning.type !== value ) {
      this.setState({
        type: value,
      });
    }
  }

  private handleSubmit = () => {
    const { appId } = this.props;
    const { type } = this.state;
    this.props.form!.validateFields((err: any, values: any) => {
      if (err) {
        return ;
      }
      const { warning = {} as Waring } = this.props;
      this.setState({
        modalLoading: true,
      });

      //
      let alarms = umbrella.getSessionStorage(`${appId}_alarms`) || [] as any;
      for (let i in alarms) {
        let alarm = alarms[i]
        if (alarm.id === warning.id) {
          alarms[i] = {...alarm, ...values}
        }
      }
      if (!warning.id) {
        alarms.push({ id: getRandomInt(999999999999) + '', type, ...values});
      }
      
      setAlarm(appId, alarms).then((res: any) => {
        if (res.resType === 0) {
          umbrella.setSessionStorage(`${appId}_alarms`, alarms);
          window.location.reload();
        }
      }).finally(() => {
        this.setState({
          modalLoading: false,
        });
      });

    });
  }

  render() {
    const {
      visible,
      hide = () => {},
      warning = {} as any,
    } = this.props;
    const {
      type,
      modalLoading,
    } = this.state;
    const {
      getFieldDecorator,
    } = this.props.form!;

    return (
      <Modal
        title="设置报警条件"
        visible={visible}
        // visible={true}
        onCancel={hide}
        cancelText="取消"
        okText={warning.type ? '修改' : '新建'}
        confirmLoading={modalLoading}
        onOk={this.handleSubmit}
      >
        <ModalWarpper>
          <div className="type_select">
            <span>异常类型: </span>
            <Select 
              disabled={!!warning.type} 
              value={type}
              style={{ width: '120px' }}
              onChange={this.changeType}
            >
              <Select.Option value="api">api警报</Select.Option>
              <Select.Option value="error">异常警报</Select.Option>
            </Select>
          </div>

          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
          >
            <Form.Item label="警报名称">
              {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: '此为必填!' },
                    { max: 8, message: '最长不能超过8个字符' },
                  ],
                  initialValue: warning.name || ''
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    placeholder="限8个字符内"
                  />
                )}
            </Form.Item>
            { 
              type === 'api' &&
              <Form.Item label="接口地址">
              {getFieldDecorator('src', {
                  rules: [
                    { required: true, message: '此为必填!' },
                  ],
                  initialValue: warning.src || '*',
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    placeholder="支持通配符 *表示匹配所有路径"
                  />
                )}
              </Form.Item>
            }
            { 
              type === 'error' &&
              <Form.Item label="异常范围">
              {getFieldDecorator('isAll', {
                  rules: [
                    { required: true, message: '此为必填!' },
                  ],
                  initialValue: warning.isAll || '0',
                })(
                  <Radio.Group>
                    <Radio value="1">所有异常</Radio>
                    <Radio value="0">单个异常</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            }
            <Form.Item label="警报异常比例">
              {getFieldDecorator('ratio', {
                  rules: [
                    { required: true, message: '此为必填!' },
                  ],
                  initialValue: warning.ratio || 30,
                })(
                  <Input
                    style={{width: '90px'}}
                    suffix="%"
                    type="number"
                    max={100}
                    min={1}
                  />
                )}
            </Form.Item>

            <Form.Item label="最小样本量" >
              {getFieldDecorator('num', {
                  rules: [
                    { required: true, message: '此为必填!' },
                  ],
                  initialValue: warning.num || '10',
                })(
                  <Input
                    style={{width: '90px'}}
                    type="number"
                    min={1}
                  />
                )}
            </Form.Item>

            <Form.Item label="监控时间区段" >
              {getFieldDecorator('time', {
                  rules: [
                    { required: true, message: '此为必填!' },
                  ],
                  initialValue: warning.time || '1',
                })(
                  <Radio.Group>
                    <Radio value="1">1小时</Radio>
                    <Radio value="6">6小时</Radio>
                    <Radio value="12">12小时</Radio>
                  </Radio.Group>
                )}
            </Form.Item>

            <Form.Item label="警报联系人" >
              {getFieldDecorator('touchAll', {
                  rules: [
                    { required: true, message: '此为必填!' },
                  ],
                  initialValue: warning.touchAll || '0',
                })(
                  <Radio.Group>
                    <Radio value="0">全员</Radio>
                    <Radio value="1">仅负责人</Radio>
                  </Radio.Group>
                )}
            </Form.Item>


          </Form>
        </ModalWarpper>
      </Modal>
    );
  }
}

export default Form.create<IProps>()(AlarmModal);
