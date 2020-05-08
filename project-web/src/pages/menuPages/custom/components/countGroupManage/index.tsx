import React from 'react';
import {
  Button,
  Spin,
  message,
  Modal,
} from 'antd';

import HelperIcon from '~/components/helperIcon';
import { 
  arrayDiff as itemDiff,
  isArrItemSame,
} from '~/utils';
import { changeCountGroups } from '~/ajax';

import GroupList from '../groupList';
import ChangeTag from '../changeTag';
import CurrentCountGroup from '../currentCountGroup';

type typeStr = 'add'|'change'|'del';

function GroupChangeHelpIcon () {
  return (
    <HelperIcon
      tipTitle="图例"
      tipContent={
        <div style={{ width: '200px' }} className="_grey_tip_text" >
          <p><ChangeTag title="新增的分组" type="add" add={12} /></p>
          <p><ChangeTag title="变化的分组" type="change" add={1} del={4} /></p>
          <p><ChangeTag title="删除的分组" type="del" /></p>
        </div>
      }
    />
  );
}

// 来自props的 Group
type Group = {
  groupKey: string;
  items: Array<string>;
};

// state中封装出用于显示的动态Group
type DynamicGroup = {
  type: typeStr;
  dynamicItems: Array<string>;
} & Group;

type IProps = {
  countGroups: Array<Group>,
  appId: string;
}

class CountGroupManage extends React.Component<IProps> {
  state = {
    currentGroup: {} as any,
    groups: [] as Array<Group>,
    dynamicItems: [] as Array<DynamicGroup>,
    isSubmitLoading: false,
  };

  addGroupInput = React.createRef() as React.RefObject<any>;

  private finidGroupBykey = (groupKey: string) => {
    const { countGroups } = this.props;
    const { dynamicItems } = this.state;
    let group = null as any;
    group = dynamicItems.find((g: DynamicGroup) => g.groupKey === groupKey);
    return group ? group : countGroups.find((g: Group) => g.groupKey === groupKey);
  }

  // 设置当前分组
  private setCurrentGroup = (groupKey = '') => {
    if (!groupKey) {
      this.setState({ currentGroup: {} } );
      return ;
    }
    console.log('即将激活的分组是 ', groupKey);
    const currentGroup = this.finidGroupBykey(groupKey);
    console.log(currentGroup,'ssssssssssssssssss');
    this.setState({ currentGroup } );
  };

  // 新增分组
  private handleAdd = (groupKey: string) => {
    const { dynamicItems } = this.state;
    // TODO 对key的合法性校验
    // 添加并激活这个分组
    dynamicItems.push({ type: 'add', groupKey, items:[], dynamicItems: [] })
    this.forceUpdate();
    this.setCurrentGroup(groupKey);
  };

  // 保存分组的变动
  private handleSave = (t: any) => {
    console.log('分组发生变化', t);
    const { dynamicItems } = this.state;
    const { key, items } = t;
    const group = this.finidGroupBykey(key);
    const preItems = group.items.concat();
    if (isArrItemSame(preItems, items)) {
      // 撤销这个动态分组
      this.cancelDynamicItem(key);
    } else if (group.type) {
      // 在动态分组中， 覆盖
      group.dynamicItems = items;
      this.forceUpdate();
    } else {
      // 不在动态分组中, 新增
      this.setState({
        dynamicItems: dynamicItems.concat({ type: 'change', groupKey: key, items: preItems, dynamicItems: items })
      });
    }

  }

  // 添加一个删除分组
  private handleDel = (groupKey: string) => {
    const {
      dynamicItems,
    } = this.state;
    const group = this.finidGroupBykey(groupKey);
    if (group.type) {
      group.type = 'del';
      this.forceUpdate();
    } else {
      const nextGroup = { type: 'del', groupKey, items: group.items.concat(), dynamicItems: group.items.concat() } as DynamicGroup;
      dynamicItems.push(nextGroup);
      this.setCurrentGroup(groupKey);
    }
  }

  // 撤销动态分组
  private cancelDynamicItem = (groupKey: string) => {
    const {
      dynamicItems,
      currentGroup,
    } = this.state;
    let index = -1;
    for (let i in dynamicItems) {
      if (dynamicItems[i].groupKey === groupKey) {
        index = Number(i);
        break;
      }
    }
    dynamicItems[index].type = 'del';
    dynamicItems.splice(index, 1);
    if (currentGroup.groupKey === groupKey) {
      this.setCurrentGroup();
    }
    this.forceUpdate();
  }

  private handleSubmitChanges = () => {
    const { appId } = this.props;
    const { dynamicItems } = this.state;
    const changeGroups = dynamicItems.concat().map((group: DynamicGroup) =>{
      return { type: group.type, groupKey: group.groupKey, items: JSON.stringify(group.dynamicItems) };
    })
    this.setState({ isSubmitLoading: true });
    changeCountGroups(appId, changeGroups).then((res: any) => {
      if (res.resType === 0) {
        Modal.success({
          content: '分组已更新成功',
          onOk: () => {
            window.location.reload();
          }
        });
        return;
      }

      message.error('分组更新失败');
    }).finally(() => {
      this.setState({ isSubmitLoading: false });
    });
  };

  private getDynamicItem = (item: DynamicGroup) => {
    const {
      type,
      groupKey,
      items,
      dynamicItems,
    } = item;
    const {
      addItems,
      delItems,
    } = itemDiff(items, dynamicItems);
    return (
      <ChangeTag
        key={groupKey} 
        type={type}
        data={groupKey}
        title={`${groupKey}（${items.length}）`}
        closable
        visible
        add={addItems}
        del={delItems}
        onChoose={this.setCurrentGroup}
        onClose={this.cancelDynamicItem}
      />
    );
  }

  render() {
    const {
      dynamicItems,
      isSubmitLoading,
      currentGroup = {},
    } = this.state
    const {
      countGroups,
      appId,
    } = this.props;

    return <div className="count_group_manager">
      <Spin
        spinning={!appId}
      >
        <GroupList
          groups={countGroups}
          currentGroup={currentGroup}
          onAdd={this.handleAdd}
          onChoose={this.setCurrentGroup}
        />
        <CurrentCountGroup
          onDel={this.handleDel}
          onSave={this.handleSave}
          group={currentGroup}
        />
        <div>
          <h1>分组变更 <GroupChangeHelpIcon /></h1>
          {
            dynamicItems.map(this.getDynamicItem)
          }
        </div>
        <div> 
          <Button
            loading={isSubmitLoading}
            disabled={dynamicItems.length === 0}
            type="primary"
            onClick={this.handleSubmitChanges}
          >
            提交
          </Button>
        </div>
      </Spin>
    </div>
  }
}

export default CountGroupManage;
