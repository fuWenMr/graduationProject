import React from 'react';
import { Row, Col } from 'antd';
import DataPanel, { DatasPanel } from '../dataPanel';

class ErrorTipPanel extends React.Component {
    render() {
        return (
            <Row gutter={[16, 16]}>
                <Col span={3}>
                    <DataPanel data={'63ms'} dataTitle={'首屏渲染时间'} dataChange={0} needMore />
                </Col>
                <Col span={5} md={7}>
                    <DatasPanel
                        datas={[1, '12%']}
                        dataTitles={['js错误数', 'js错误率']}
                        dataChanges={[1, 1]}
                        isDatasNeedMore={[false, false]}
                    />
                </Col>
                <Col span={5} md={7}>
                    <DatasPanel
                        datas={[0, '0%']}
                        dataTitles={['API错误数', 'API错误率']}
                        dataChanges={[0, 0]}
                        isDatasNeedMore={[false, false]}
                    />
                </Col>
                <Col span={5} md={7}>
                    <DatasPanel
                        datas={[8, '100%']}
                        dataTitles={['资源请求错误数', '资源请求错误率']}
                        dataChanges={[1, 1]}
                        isDatasNeedMore={[false, false]}
                    />
                </Col>
            </Row>
        );
    }
}

export default ErrorTipPanel;
