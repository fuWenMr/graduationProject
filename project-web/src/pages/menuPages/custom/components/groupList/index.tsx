import React from 'react';
import { 
  Select,
  Icon,
 } from 'antd';

 import StyledTooltip from '~/components/styledAntdTooltip';

 import { Wrapper } from './styled';

const { Option } = Select;
type IProps = {
  groups: any;
  currentGroup: any;
  onChoose: (a0: any) => void;
  onAdd: (a: string) => void;
}

class GroupList extends React.Component<IProps> {
  state = {
    isNewGroup: false,
  }
  private inputKey = '';
  private able2Add = false;



  private handleSearch = (key: string) => {
    const { isNewGroup } = this.state;
    const { groups } = this.props;
    let isNew = false;
    if (key) {
      this.inputKey = key;
      isNew = !groups.some((group: any) => key === group.groupKey);
    }
    if (isNew !== isNewGroup) {
      this.setState({ isNewGroup: isNew });
      if (isNew) {
        this.able2Add = true;
      } else {
        // 因为点击icon会导致 select失焦清空 所以这里准备一个延时以保证icon响应到点击事件
        setTimeout(() => {this.able2Add = false;}, 200);
      }
    }
  }

  private handleAdd = () => {
    if(!this.able2Add || !this.inputKey) {
      return ;
    }
    this.props.onAdd(this.inputKey);
    this.able2Add = false;
  }

  private handleChoose = (groupKey: string) => {
    const { onChoose } = this.props;
    onChoose(groupKey);
  }

  render(){
    const {
      groups = [],
    } = this.props;
    const {
      isNewGroup,
    } = this.state;

    // console.log('长度为:' );
    return <Wrapper>
      <Select
        placeholder="请输入你想查找或创建的分组名"
        style={{ minWidth: '350px' }}
        showSearch
        allowClear
        onSearch={this.handleSearch}
        onChange={this.handleChoose}
      >

      {
        groups.map((group: any) => {
          const { groupKey, items } = group;
          return <Option key={groupKey} value={groupKey}>{`${groupKey}(${items.length})`}</Option>
        })
      }
      </Select>
      {
        // isNewGroup &&
        <span onClick={this.handleAdd}>
          <StyledTooltip
            mouseLeaveDelay={0} 
            className={`add_icon ${isNewGroup || 'add_icon_hide'}`} 
            title="创建该分组"
          >
            <Icon
              className="_click" 
              type="folder-add" 
              theme="twoTone" 
              twoToneColor="#52c41a" 
            />
          </StyledTooltip>
        </span>
      }
    </Wrapper>
  }
}
export default GroupList;
