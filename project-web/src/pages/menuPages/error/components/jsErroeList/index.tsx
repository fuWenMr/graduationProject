import React from 'react';
import {
  Icon,
  Empty,
  Tooltip,
  message,
} from 'antd';
import { copyText } from '~/utils';

function ErrorItem (props: {error: any}) {
  const { type, sum, date, file, lineno, colno } = props.error;
  const [errorType, msg = ''] = type.split(/:|：/)
  const error_stack_0 = `${file}(${lineno}:${colno})`;
  return <li>
    <Icon type="warning" theme="twoTone" twoToneColor="red" />
    <Tooltip title={`报错位置：${error_stack_0}) `}>
      <span
        onClick={() => {
          copyText(error_stack_0);
          message.success(`成功复制错误栈：${error_stack_0}到剪贴板`);
        }} 
        className="error_type"
      >
        {errorType}:
      </span>
    </Tooltip>
    <span>{msg}</span>
    <span className="error_num"> 次数：{sum}</span>
    <span className="last_time">最近： {(new Date(date) as any).toString('yyyy-MM-dd hh:mm')}</span>
  </li>
  
}

type Iprops = {
  data: any[],
}
class JsErrorList extends React.Component<Iprops> {

  render() {
    const { data } = this.props;
    console.log('errorList', data)
    return <>
      {
        data.length === 0
        ? <Empty />
        : <ul className="js_error_list">
            {
              data.map((error: any) => <ErrorItem error={error} />)
            }
          </ul>
      }
    </>;
  }
}

export default JsErrorList;
