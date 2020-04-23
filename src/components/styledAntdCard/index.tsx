import React, { ReactNode } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

export interface Tab {
    key?: string;
    title: string;
    content?: ReactNode | string;
}

type CardTab = {
    key: string;
    tab: string;
    content: string | ReactNode;
};

interface IProps extends CardProps {
    tabs: Array<Tab>;
    useChild?: boolean;
}

class StyledAntdCard extends React.Component<IProps> {
    state = {
        activeKey: '',
    };

    private tabs: Array<CardTab>;
    private contentList: any;

    // eslint-disable-next-line
    constructor(props: IProps) {
        super(props);
        const { tabs } = props;
        this.state.activeKey = tabs[0] ? tabs[0].title : '';
        this.tabs = this.getTabs(tabs);
        this.contentList = this.getContentList(this.tabs);
    }

    private getTabs(tabs: Array<Tab>) {
        return tabs.map((tab) => {
            return {
                key: tab.key || tab.title,
                tab: tab.title,
                content: <>{tab.content}</>,
            };
        });
    }

    private getContentList(tabs: Array<CardTab>) {
        let contentList: any = {};
        for (let tab of tabs) {
            contentList[tab.key] = tab.content;
        }
        return contentList;
    }

    onTabChange = (key: string) => {
        const { onTabChange } = this.props;
        this.setState({ activeKey: key });
        onTabChange && onTabChange(key);
    };

    render() {
        const { tabs, tabList, onTabChange, useChild, children, ...other } = this.props;
        const { activeKey } = this.state;

        return (
            <>
                <Card tabList={this.tabs} onTabChange={this.onTabChange} {...other}>
                    {useChild ? children : this.contentList[activeKey]}
                </Card>
            </>
        );
    }
}

export default StyledAntdCard;
