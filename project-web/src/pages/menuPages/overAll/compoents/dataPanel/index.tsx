import React from 'react';
import { Card, Icon } from 'antd';
import Wrapper from './styled';

interface dataPanelProps {
  data: string | number;
  dataTitle: string;
  dataChange: number;
  needMore: boolean;
}

interface datasPanelProps {
  datas: Array<number | string>;
  dataTitles: string[];
  dataChanges: number[];
  isDatasNeedMore: boolean[];
}

function DataPanel(props: dataPanelProps) {
  let { data, dataTitle, dataChange, needMore } = props;
  let DataChgangeIndex = () => {
    let isDataRise = dataChange >= 0;
    let isDataBetter = needMore === isDataRise;
    return (
      <span className={`data_change_${dataChange === 0 || isDataBetter ? 'good' : 'waring'}`}>
        {Math.abs(dataChange)}%
        <Icon type={isDataRise ? 'rise' : 'fall'} />
      </span>
    );
  };

  return (
    <Card bordered={false} bodyStyle={{padding: '24px 12px'}}>
      <Wrapper>
        <div className="data ">{data}</div>
        <div className="data_title ">{dataTitle}</div>
        <div className="data_change ">
          周同比:
          <DataChgangeIndex />
        </div>
      </Wrapper>
    </Card>
  );
}

function DatasPanel(props: datasPanelProps) {
  let { datas, dataTitles, dataChanges, isDatasNeedMore } = props;

  return (
    <Wrapper>
      <div className="half">
        <DataPanel
          data={datas[0]}
          dataTitle={dataTitles[0]}
          dataChange={dataChanges[0]}
          needMore={isDatasNeedMore[0]}
        />
      </div>
      <div className="half">
        <DataPanel
          data={datas[1]}
          dataTitle={dataTitles[1]}
          dataChange={dataChanges[1]}
          needMore={isDatasNeedMore[1]}
        />
      </div>
      <span className="vertical_line" />
    </Wrapper>
  );
}

export { DatasPanel };
export default DataPanel;
