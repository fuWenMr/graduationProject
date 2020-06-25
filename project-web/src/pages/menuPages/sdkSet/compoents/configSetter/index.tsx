import React from 'react';
// import { Card } from 'antd';
import Card, { Tab } from '~/components/styledAntdCard';
import BaseSetter from '../baseSetter';
import SpecialSetter from '../specialSetter';
import MoreSetter from '../moreSetter';

const tabs: Array<Tab> = [
    {
        key: 't0',
        title: '基础配置',
    },
    {
        key: 't1',
        title: '高级配置',
    },
    {
        key: 't2',
        title: '更多操作',
    },
];

class ConfigSetter extends React.Component<any> {
    state = {
        activeKey: 't0',
    };

    onTabChange = (key: string) => {
        this.setState({ activeKey: key });
    };

    private getCardContent = () => {
        const { baseConfig, setBaseConfig, specialConfig, setSpecialConfig } = this.props;
        const { activeKey } = this.state;

        const cardContentList = {
            t0: <BaseSetter baseConfig={baseConfig} setBaseConfig={setBaseConfig} />,
            t1: <SpecialSetter specialConfig={specialConfig} setspecialConfig={setSpecialConfig} />,
            t2: <MoreSetter />,
        } as any;
        return cardContentList[activeKey];
    };

    render() {
        const cardContent = this.getCardContent();
        return (
            <>
              <Card tabs={tabs} useChild onTabChange={this.onTabChange}>
                {cardContent}
              </Card>
            </>
        );
    }
}

export default ConfigSetter;
