import React from 'react';
import {
  Empty,
  Icon,
  Table,
  message,
} from 'antd';

import { copyText } from '~/utils';

type IProps = {
  data: any[],
}
class ErrorForm extends React.Component<IProps> {

  private columns = [
    {
      title: '报错',
      dataIndex: 'type',
    }, {
      title: 'ip',
      dataIndex: 'ip',
    }, {
      title: '时间',
      dataIndex: 'createAt',
      render: (value: string) => (new Date(value) as any).toString('yyyy/MM/dd hh:mm'),
    }, {
      title: 'url',
      dataIndex: 'herf',
      render: (value: string) => <div className="table_url">{value}</div>,
    }, {
      title: '用户环境',
      dataIndex: 'userAgent',
    }, {
      title: '错误栈',
      dataIndex: 'stack',
      render: (value: string) => (
        <div
          onClick={() => {
            copyText(value.replace(/\|\|/g, ' '));
            message.success('成功复制错误栈到剪切板');
          }}
          className="table_stack">
          {value.replace(/\|\|/g, ' ')}
        </div>),
    }
  ];

  render() {
    const { data } = this.props;
    return (
      data.length === 0
      ? <Empty
          description="最近都没有报错 应用很健康呢"
          imageStyle={{fontSize: '100px'}}
          image={<Icon type="smile" />}
        />
      : <div className="tables">
          <Table
            bordered
            size="small"
            columns={this.columns}
            dataSource={data}
            pagination={false} 
          />
        </div>
    );
  }
}

export default ErrorForm;
