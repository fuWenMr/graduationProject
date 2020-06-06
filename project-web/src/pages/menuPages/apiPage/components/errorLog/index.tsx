import React from 'react';
import {
  Card,
  Empty,
  Table,
  Switch,
  Icon,
} from 'antd'

type IProps = {
  data: any[],
};
class ErrorLog extends React.PureComponent<IProps> {
  state = {
    show404: false,
  };

  private columns = [
    {
      title: '状态码',
      dataIndex: 'status',
    }, {
      title: '响应耗时',
      dataIndex: 'time',
    }, {
      title: '响应内容',
      dataIndex: 'response',
    }, {
      title: '请求IP',
      dataIndex: 'ip',
    },{
      title: '记录产生时间',
      dataIndex: 'date',
      render: (value: string) => (new Date(value) as any).toString('yyyy-MM-dd hh:mm')
    }
  ];

  private chagne404Checked = (checked: boolean) => {
    this.setState({
      show404: !checked,
    })
  }

  render() {
    const {
      data,
    } = this.props;

    console.log('看看数据', data)
    const {
      show404,
    } = this.state;
    const sum404 = data.reduce((total: number, record: any) => { 
      return record.status + '' === '404'? total + 1 : total;
    }, 0);
    return <Card title="api异常调用日志">
      {
        data.length === 0
        ? <Empty
            description="暂无异常数据， 应用很健康"
            imageStyle={{fontSize: '100px'}}
            image={<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />}
          />
        : <>
            <div>404 频次: {sum404} <span className="space">正正正</span> 隐藏404日志 <Switch defaultChecked onChange={this.chagne404Checked} /></div>
            <Table
              style={{marginTop: '12px'}}
              size="small"
              pagination={false}
              columns={this.columns}
              dataSource={
                data.reduce((total: any[], api: any) => {
                  if ( show404 || api.status+'' !== '404') {
                    total.push(api);
                  }
                  return total;
                }, [])
              }
            />
          </>
      }
    </Card>;
  }
}

export default ErrorLog;
