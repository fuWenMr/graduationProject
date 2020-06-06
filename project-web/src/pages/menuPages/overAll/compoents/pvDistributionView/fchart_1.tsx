import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  Guide,
  Coord,
  Label
} from 'bizcharts';
import DataSet from "@antv/data-set";

const { Html } = Guide;

type IProps = {
  dataSource: any[],
  pvSumCount: number,
}
class FChart extends React.Component<IProps> {

  render() {
    const { dataSource, pvSumCount } = this.props;
    const dv = new DataSet.View().source(dataSource).transform({
      type: "percent",
      field: "pv",
      dimension: "page",
      as: "percent"
    });
    return <div>
      <Chart
        height={400}
        data={dv.rows}
        padding={50}
        forceFit
      >
        <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
        <Axis name="page" />
        <Legend
          position="right"
          offsetX={-60}        
        />
        <Tooltip
          // showTitle={false}
          // itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Guide>
          <Html
            position={["50%", "50%"]}
            html={
              `<div
                class="distribution_view_guide"
              >pv<br><span class="guide_num">${pvSumCount}</span>
              </div>`
            }
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color="page"
          tooltip={[
            "page*percent",
            (page: any, percent: any) => {
              return {
                title: 'pv占比',
                name: page,
                value: `${(Number(percent) * 100).toFixed(1)}%`
              };
            }
          ]}
          style={{
            lineWidth: 1,
            stroke: "#fff"
          }}
        >
          <Label
            content="percent"
            formatter={(val: any, item: any) => {
              return `${item.point.page}: ${(Number(val) * 100).toFixed(1)}%` ;
            }}
          />
        </Geom>
      </Chart>
    </div>;
  }
}

export default FChart;
