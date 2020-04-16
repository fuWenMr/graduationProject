/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';

class OverAll extends React.Component {
  render() {
    return (
      <div className="gutter-example button-demo">
        <Row>
          <Col>
            <Card bordered={false}>
              <h2>67ms</h2>
              <div className="text-muted">首次渲染平均耗时</div>
            </Card>
          </Col>
          
        </Row>
      </div>
    )
  }
}

export default OverAll;