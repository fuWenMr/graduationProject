import React from 'react';
import umbrella from 'umbrella-storage';
import { 
  Empty,
  Icon,
  message,
} from 'antd';
import { getAlarm, setAlarm } from '~/ajax';

type AlarmItem = {
  alarm: any,
  onDel: () => void,
  onItemClick: () => void,
}; 
const typeMap = {
  api: 'api异常报警',
  error: 'js异常报警',
} as any;
function AlarmItem(props: AlarmItem) {
  const {
    name,
    type,
    src,
    isAll,
    ratio,
    num,
    time,
    touchAll,
  } = props.alarm;
  const {
    onDel = () => {},
    onItemClick = () => {},
  } = props;
  return <li className="alarm_item">
    <div
      className="show_btn"
      onClick={onItemClick}
    >
      详情
    </div>
    <h1 className="title">
      {name}
      <span className="title_type">
        {
          `(${typeMap[type]})`
        }
      </span>
      <Icon
        type="delete"
        className="del_btn"
        onClick={onDel}
        />
    </h1>

    <div className="content">
      {
        type === 'api' &&
        <span className="content_item">
          <span className="item_key">api接口：</span>
          <span className="item_value">{src}</span>
        </span>
      }
      {
        type === 'error' &&
        <span className="content_item">
          <span className="item_key">异常范围：</span>
          <span className="item_value">{isAll === '1' ? '所有异常' : '单个异常'}</span>
        </span>
      }
    </div>
    <div className="content">
      <span className="content_item">
        <span className="item_key">警报异常比例:</span>
        <span className="item_value">{ratio}%</span>
      </span>

      <span className="content_item">
        <span className="item_key">最小样本量:</span>
        <span className="item_value">{num}</span>
      </span>
    </div>
    <div className="content" >
      <span className="content_item">
        <span className="item_key">轮询间隔:</span>
        <span className="item_value">{time}小时</span>
      </span>

      <span className="content_item">
        <span className="item_key">警报联系人:</span>
        <span className="item_value">{touchAll === '1' ? '所有成员' : '仅负责人'}</span>
      </span>
    </div>
  </li>
}

type IProps = {
  appId: string,
  onItemClick: (a?: any) => any,
};
class AlarmList extends React.Component<IProps> {
  state = {
    warnings: [] as any,
  };

  componentDidMount() {
    const { appId } = this.props;
    if (appId) {
      this.getData(appId);
    }
  }
  componentDidUpdate(prevProps: IProps) {
    const { appId } = this.props;
    if (appId && appId !== prevProps.appId) {
      this.getData(appId);
    }
  }

  private getData = (appId: string) => {
    getAlarm(appId).then((res: any) => {
      if (res.resType === 0) {
        const alarms = res.data as any[];
        console.log('语文')
        console.log(alarms)
        console.log(alarms[0].values)
        umbrella.setSessionStorage(`${appId}_alarms`, alarms[0].values);
        this.setState({
          warnings: JSON.parse(alarms[0].values),

        });
      }
    });
  }

  private delAlarm = (alarmId: string) => {
    const { appId } = this.props;
    const {
      warnings,
    } = this.state;
    for (let i in warnings) {  
      if (warnings[i].id === alarmId) {
        warnings.splice(i,1);
        setAlarm(appId, warnings).then((res: any) => {
          if (res.resType === 0) {
            umbrella.setSessionStorage(`${appId}_alarms`, warnings);
            this.setState({
              warnings,
            });
            return ;
          }
          message.error('操作失败');
        });

        return ;
      }
    }
  };

  render() {
    const {
      warnings,
    } = this.state;
    const {
      onItemClick,
    } = this.props;
    return (
      warnings.length === 0 
      ? <Empty
          description="目前没有设置报警条件" 
        />
      : <ul>
          {
            warnings.map((alarm: any) => (
              <AlarmItem
                key={alarm.id}
                alarm={alarm}
                onDel={() => {this.delAlarm(alarm.id)}}
                onItemClick={() => {onItemClick(alarm)}}
              />
            ))
          }
        </ul>
    );
  }
}

export default AlarmList;