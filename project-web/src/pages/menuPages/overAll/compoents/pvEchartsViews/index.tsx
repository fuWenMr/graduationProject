import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { Card } from 'antd';
import data from './data';
import run from './map';

run();
class Curved extends React.Component {
    render() {
        const cols = {
            month: {
                range: [0, 1],
            },
        };
        return (
            <Chart height={400} data={data} scale={cols} forceFit>
                <Legend />
                <Axis name="value" />
                <Axis name="date" />

                <Tooltip
                    crosshairs={{
                        type: 'y',
                    }}
                />
                <Geom type="line" position="date*value" size={2} color={'type'} shape={'smooth'} />
                <Geom
                    type="point"
                    position="date*value"
                    size={2}
                    shape={'circle'}
                    color={'type'}
                    style={{
                        stroke: '#fff',
                        lineWidth: 1,
                    }}
                />
            </Chart>
        );
    }
}

class PvEchartsViews extends React.Component {
    render() {
        return (
            <Card bordered={false}>
                <>
                    <div>
                        <div>
                            总UV<span>5</span>
                        </div>
                        <div>
                            总PV<span>18</span>
                        </div>
                    </div>
                    <Curved />
                </>
            </Card>
        );
    }
}

export default PvEchartsViews;
