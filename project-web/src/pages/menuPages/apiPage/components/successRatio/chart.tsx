import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  View,
} from 'bizcharts';
import DataSet from '@antv/data-set';

type IProps = {
  data: Array<any>
  ticks: Array<string>
}

const legendItems = [
  { value: '失败频次', marker: { symbol: 'square', fill: 'orange', radius: 5 } },
  { value: 'api调用成功率', marker: { symbol: 'hyphen', stroke: '#87d068', radius: 5, lineWidth: 3 } },
];


class FChart extends React.Component<IProps> {
  chart: any;

  render() {
    const {
      data,
    } = this.props;

    const ds = new DataSet();
    ds.setState('type', '');
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'rename',
      map: {
        failSum: '失败频次', // row.xxx 会被替换成 row.yy
      }
    }).transform({
      type: 'fold',
      fields: ['失败频次'], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
    });
    console.log('效果',dv.rows);
    return <>
      {
        data.length > 0 && (
          <Chart height={400} data={dv} padding={"auto"} forceFit onGetG2Instance={(c) => {
            this.chart = c;}}>
            <Axis
              name="value"
              line={{
                stroke: "rgb(213,213,213)"
              }}
              tickLine={{
                stroke: "rgb(213,213,213)",
                length:2 // 刻度线长度
              }}
            />
            <Axis
              name="date"
              title={{ position: 'end' }}
            />
            <Legend
              custom
              clickable={false}
              items={legendItems}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="interval"
              position="date*value"
              size={15}
              color={['type', ['orange']]}
              shape={'smooth'}
              adjust={[
                {
                  type: "dodge",
                  marginRatio: 1 / 32,
                }
              ]}
            />
            <View data={dv}>
              <Geom
                type="line"
                position="date*successRatio"
                color="#87d068"
                size={3}
                tooltip={['successRatio*date', (successRatio, date) => {
                  return {
                    title: date,
                    name: `api调用成功率`,
                    value: Number(successRatio)*100+'%',
                  }
                }]}
              />
              <Geom
                type="line"
                position="date*successRatio"
                color="#87d068"
                opacity={0}
                size={1}
                tooltip={['successRatio*date', (successRatio, date) => {
                  let a = data.find((d: any) => d.date === date);
                  return {
                    title: date,
                    name: `api调用频次`,
                    value: a ? (a.failSum + a.okSum) + '' : '数据缺失',
                  }
                }]}
              />
            </View>
          </Chart>
        )
      }
    </>
  }
}

export default FChart;
