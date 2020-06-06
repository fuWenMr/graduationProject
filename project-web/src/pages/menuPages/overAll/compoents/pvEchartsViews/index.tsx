import React from 'react';
import {
  Card,
} from 'antd';
import FChart from './char';
import DataSet from '@antv/data-set';

type IProps = {
  dataSource: any[],
  ticks: string[],
  pvSumCount: number,
};

class PvEchartsViews extends React.Component<IProps> {
  state = {
    pageName: 'all/all',
  };

  private filterDataByPageName() {
    const { dataSource } = this.props;
    const { pageName } = this.state;
    if (dataSource.length === 0) {
      return [];
    }
    const dv = new DataSet.View().source(dataSource);
    dv.transform({
      type: 'filter',
      callback(row: any) {
        return row.page === pageName;
      }
    });
    return dv.rows;
  };

  private getPageList() {
    const { dataSource } = this.props;
    if (dataSource.length === 0) {
      return [];
    }
    let flag = {} as any;
    let res = [] as any[];
    for (let row of dataSource) {
      const pageName = row.page;
      if (pageName && !flag[pageName] ) {
        res.push(row);
        flag[pageName] = 1;
      }
    }
    res.sort((a: any, b:any) => {
      return (a.page === 'all/all' && Number(a.pv) >= Number(b.pv)) ? -1 : 1;
    });
    return res;
  };

  private getCount = () => {
    const { dataSource } = this.props;
    if (dataSource.length === 0) {
      return {} as any;
    }
    let pvCount=0;
    let uvCount=0;
    for (let row of dataSource){
      pvCount += row.pv || 0;
      uvCount += row.uv || 0;
    }
    return { pvCount, uvCount };
  }


  private handlePageClick = (pageName: string) => {
    if (pageName !== this.state.pageName) {
      this.setState({ pageName });
    }
  }

  render() {
    const {
      ticks,
      pvSumCount,
    } = this.props;
    const {
      pageName,
    } = this.state;

    const data = this.filterDataByPageName();

    const pages = this.getPageList();
    // const { pvCount = 0, uvCount = 0 } = this.getCount();
    
    return (
      <Card bordered={false} title="访问趋势">
        <div className="pv_count_time_view">
          <div className="page_radio">
              <div className="title">
              <p>
                总PV：<span> {pvSumCount}</span>
              </p>
              <p>
                总UV：<span> {2}</span>
              </p>
            </div>
            <ul className="page_list">
              {
                pages.length > 0 && pages.map((page: any) => {
                  return (
                    <li
                      key={page.page}
                      className={pageName === page.page ? 'active_page' : ''}
                      onClick={() => {this.handlePageClick(page.page)}}
                    >
                      {page.page === 'all/all' ? '总览' : page.page}
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <FChart
            dataSource={data}
            ticks={ticks}
          />
        </div>
      </Card>
    );
  }
}

export default PvEchartsViews;
