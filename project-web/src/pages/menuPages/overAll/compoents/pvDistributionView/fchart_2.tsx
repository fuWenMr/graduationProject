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
}
class FChart extends React.Component<IProps> {

  render() {
    const { dataSource } = this.props;
    const dv = new DataSet.View().source(dataSource).transform({
      type: "percent",
      field: "uv",
      dimension: "page",
      as: "percent"
    });
    return <div>
      <Chart
        height={300}
        data={dv.rows}
        padding={[80, 100, 80, 80]}
        forceFit
      >
        <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
        <Axis name="page" />
        <Legend
          position="right"         
        />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Guide>
          <Html
            position={["50%", "50%"]}
            html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
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
              percent = percent * 100 + "%";
              return {
                name: page,
                value: percent
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
              return item.point.page + ": " + Number(val).toFixed(3);
            }}
          />
        </Geom>
      </Chart>
    </div>;
  }
}

export default FChart;
