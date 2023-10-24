import React from 'react';
import { RingProgress } from '@ant-design/plots';
import { DoughnutChartType } from '../../types/pageType';


const DoughnutChart: React.FC<DoughnutChartType> = ({ rate }) => {

    const config = {
        width: 500,
        autoFit: false,
        percent: rate,
        color: ['#F4664A', '#E8EDF3'],
        innerRadius: 0.85,
        radius: 0.98,
        statistic: {
            title: {
                style: {
                    color: '#363636',
                    fontSize: '30px',
                    lineHeight: '14px',
                    height: "50px"
                },
                formatter: () => '정답률',
            },
            content: {
                style: {
                    color: '#363636',
                    fontSize: '30px',
                    lineHeight: '14px',
                    height: "50px"
                },
            }
        },
    };
    return <div><RingProgress {...config} /></div>;
}

export default DoughnutChart;


