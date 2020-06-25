import React from 'react';
import {
  Card,
  Icon,
  Spin,
  message,
} from 'antd';
import { connectAlita } from 'redux-alita';
import HelperIcon from '~/components/helperIcon';
import {
  STATE_CURRENT_APP,
} from '~/redux/reduxStateName';
import {
  getCustomKeys
} from '~/ajax';
import STooltip from '~/components/styledAntdTooltip';
import { copyText } from '~/utils';


function KeyListHelperIcon() {
  return (
    <HelperIcon tipContent={<p className="_grey_tip_text _re_p">
        这里会列出查询时间内有上报的key
        <br />
        你可以用这些key来创建你需要的分组
      </p>} 
    />
  );
}

class KeyList extends React.Component<any> {
  state = {
    loading: true,
    countKeys: [] as string[],
    filterKey: '',
  };
  private inputRef = React.createRef() as React.RefObject<any>;

  componentDidMount() {
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    const appId = (currentApp || {}).id;
    if (appId) {
      this.getKeylist();
    }
  }

  componentDidUpdate(prevProps: any) {
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    const appId = (currentApp || {}).id;
    const prevId = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data && this.props[STATE_CURRENT_APP].data.id;
    if (appId && appId !== prevId) {
      this.getKeylist()
    }
  }

  private getKeylist() {
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    const appId = (currentApp || {}).id;
    this.setState({ loading: true });
    getCustomKeys(appId).then((res: any) => {
      if (res.resType === 0) {
        // TODO 区分不同的key
        this.setState({ countKeys: res.customKeys});
        return ;
      }
    }).finally(() => {
      this.setState({ loading: false });
    })
  }

  private handleListClick = (key: string) => {
    if(copyText(key)) {
      message.success(`已复制 ${key} 到剪贴板`);
    } else {
      message.warning('复制失败， 请手动复制文本');
    }
  }

  private filter = () => {
    const {
      countKeys,
      filterKey,
    } = this.state;
    console.log('---', filterKey);
    if (!filterKey) {
      return countKeys;
    }
    let res = [];
    for (let key of countKeys) {
      console.log()
      if (key.includes(filterKey)) {
        res.push(key);
      }
    }
    return res;
  }

  private handleSearch = () => {
    const value = this.inputRef.current.value;
    this.setState({
      filterKey: value,
    })
    console.log('filterKey', value);
  };

  render() {
    const { 
      loading,
    } = this.state;
    const countKeys = this.filter();

    const keyList = countKeys.length > 0 && <ul className="custom_key_list">
      {
        countKeys.map((key: string) => {
          return (
            <li
              key={key}
              className="_click"
              onClick={() => {this.handleListClick(key)}}
            >
              <STooltip
                title={`复制： ${key}`}
                mouseLeaveDelay={0}
                mouseEnterDelay={0}
              >
                {key}
              </STooltip>
            </li>
          );
        })
      }
    </ul>;

    return <div className="key_list">
      <Card
        title={<>有效数据key<KeyListHelperIcon /></>}
        bodyStyle={{minHeight:'800px', paddingRight: '0'}}
      >
        <Spin 
          wrapperClassName="list_with_search"
          spinning={loading}
        >
          <div className="search_input">
            <input ref={this.inputRef} placeholder="搜索你想要找的key" />
            <span className="search_btn" onClick={this.handleSearch} ><Icon type="search" /></span>
          </div>
          <div className="res_list">
            {keyList}
          </div>
        </Spin>
        
      </Card>
    </div>
  }
}

export default connectAlita([STATE_CURRENT_APP])(KeyList);
