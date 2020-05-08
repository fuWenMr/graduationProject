import React from 'react';
import {
  Select,
  Spin,
  Icon,
} from 'antd';

import StyledTooltip from '~/components/styledAntdTooltip';
import { isArrItemSame } from '~/utils';

const Option = Select.Option;
type IProps = {
  group: any,
  onSave: (a?: any) => void,
  onDel: (a?: any) => void,
  groupKey?: string,
  type?: string,
  items?: Array<String>,
  dynamicItems?: Array<String>,
}



class CurrentCountGroup extends React.Component<IProps> {
  state = {
    able2save: false,
    selectValue: [] as Array<string>,
  };
  private dynamicItems = [] as Array<string>;
  private currentItems = [] as Array<string>;

  componentDidUpdate(prevProps: any) {
    const { group = {} } = this.props;
    const { group: prevGroup = {} } = prevProps;
    if (group.groupKey !== prevGroup.groupKey ) {
      this.setState({
        selectValue: group.dynamicItems || group.items,
        able2save: false,
      });
    } else if ( group.type !== prevGroup.type ) {
      this.forceUpdate();
    }
  }

  private handleDel = () => {
    const { onDel, group } = this.props;
    onDel(group.groupKey);
  }

  private handleSave = () => {
    const {
      onSave,
      group,
    } = this.props;
    onSave({
      key: group.groupKey, 
      items: this.currentItems,
    });
    this.setState({ able2save: false });
  }

  private handleChange = (currentItems: Array<string>) => {
    this.setState({ selectValue: currentItems })
    const { able2save: flag } = this.state;
    // console.log('分组内容变化啦啊', currentItems);
    const able2save = !isArrItemSame(this.dynamicItems, currentItems);
    if (able2save) {
      this.currentItems = currentItems;
    }
    if (able2save !== flag) {
      this.setState({ able2save });
    }

  }

  render() {
    const {
      able2save,
      selectValue,
    } = this.state;
    const { group = {} } = this.props;
    const {
      type,
      groupKey,
      items = [],
    } = group;
    const dynamicItems = (group.dynamicItems || items).concat();
    this.dynamicItems = dynamicItems;

    let options = items.map((item: string) => {
      return <Option key={item} value={item}>{item}</Option>
    });

    return <div>
      <Spin
        spinning={type==='del' || !groupKey }
        indicator={<></>}
        tip={ groupKey ? '待删除的分组 不可操作' : '尚未选中任何分组'}
        wrapperClassName="_back_antd"
      >
        <div style={{minHeight:'220px'}}>
          <h1>
            {groupKey ? `分组${groupKey}中包含 ${items.length}个key` : '未选中分组'}
            <span className="space">正正</span>
            {
               (!type || type==='change') && (
                <StyledTooltip title="将该分组标记为待删除">
                  <Icon
                    onClick={this.handleDel}
                    className="_click"
                    type="delete" 
                    theme="twoTone" 
                    twoToneColor="#eb2f96" 
                  />
                </StyledTooltip> 
              )
            }
          </h1>
          <div style={{minHeight:'100px'}}>
            {
              groupKey && <>
                <Select 
                  mode="tags" 
                  style={{ width: '100%' }} 
                  placeholder="输入你想包含在这个分组里的计数类 key"
                  defaultValue={dynamicItems}
                  value={selectValue}
                  onChange={this.handleChange}
                >
                {
                  options
                }
                </Select>
              </>
            }
          </div>
          <div>
            {
              groupKey && able2save && <p className="_click_text" onClick={this.handleSave}>保存当前分组状态到变更</p>
            }  
          </div>
          
        </div>
      </Spin>
    </div>
  }
}

export default CurrentCountGroup;
