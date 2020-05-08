import React from 'react'
import {
  Tag,
  Popover,
} from 'antd';

type ChangeTagProps = {
  title: string;
  type: 'add'|'change'|'del';
  add?: number | Array<string>,
  del?: number | Array<string>,
  onChoose?: (a?: any) => void,
  onClose?: (a?: any) => void,
  closable?: boolean,
  visible?: boolean,
  data?: any,
};

function ChangeTag(props: ChangeTagProps) {
  const {
    type,
    title,
    add = 0,
    del = 0,
    onChoose,
    onClose = () => {},
    closable = true,
    data,
    ...other
  } = props
  const color = ({
    del: 'red',
    change: 'cyan',
    add: 'green',
  } as any)[type] || 'green';
  const addNum = Array.isArray(add) ? add.length : add;
  const delNum = Array.isArray(del) ? del.length : del;
  const Wrapper = (( Array.isArray(add) || Array.isArray(del)) && (addNum + delNum) ) 
  ? Popover
  : (p: any) => <>{p.children}</>;

  return <Tag
    color={color}
    onClose={() => {console.log('关闭');onClose(data);}}
    closable = {!!closable}
    {...other}
  >    {/* eslint-disable-line */}
    <span
      className={onChoose ? '_click' : ''}
      onClick={() => { onChoose && onChoose(data);}}
    >
      <Wrapper
        title="变更内容"
        content={<>
          {
            Array.isArray(add) && addNum > 0 && add.map((a: string) => {
              return <p key={a}><ChangeTag title={a} type="add" closable={false} /></p>
            })
          }
          {
            Array.isArray(del) && delNum > 0 && del.map((d: string) => {
              return <p key={d}><ChangeTag title={d} type="del" closable={false} /></p>
            })
          }
        </>}
      >
        {title}
      </Wrapper>
      {(addNum !== 0) && <span style={{ color: '#52c41a' }}> +{addNum} </span>}
      {(delNum !== 0) && <span style={{ color: '#f5222d' }}> -{delNum} </span>}
    </span>
  </Tag>
}

export default ChangeTag;