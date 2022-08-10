import React from "react";
import { useSelector } from "react-redux"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const CreateChart = () => {
    const { result, period } = useSelector((state) => state.populations);
    let options;
    if(period.length > 0) {
        options = {
            title: {
                text: '',
            },
            xAxis: {
                title: {
                    text: '年度',
                },
                categories: period,
                allowDecimals: false,
            },
            yAxis: {
                title: {
                    text: '人口数',
                },
                allowDecimals: false,
            },
            tooltip: {
                valueSuffix: '人',
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    allowDecimals: false,
                },
            },
            series: result.map((pref) => {
                if(pref.isChecked) {
                    return {
                        name: pref.prefName,
                        data: pref.prefData
                    }
                }
                return null
            }).filter(e => e !== null)
        };
    }

    const isPrint = result.map((pref) => {
        if(pref.isChecked) {
            return 1;
        }
        return null
    }).filter(e => e !== null);

    return (
        <React.Fragment>
        {isPrint.length > 0 &&
            <HighchartsReact
            highcharts={Highcharts}
            options={options}
            />
        }
        </React.Fragment>
    )
}