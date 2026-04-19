import { JSONObject } from '@/app/lib/definations';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getVarColor } from '@/app/lib/utils';

const convertToBarChart = (data: JSONObject[]) => {
    const categories = data.map((item) => `${item._id.year}-W${item._id.week}`);

    const created = data.map((item) => item.created);
    const completedData = data.map((item) => item.completed);
    const inProgressData = data.map((item) => item.in_progress);

    return { categories, created, completedData, inProgressData };
};

export default function WeeklyProgressTrend({
    data
}: {
    data: JSONObject[] | null;
}) {
    if (!data) return <div>Loading ...</div>;

    const { categories, created, completedData, inProgressData } =
        convertToBarChart(data);

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent'
        },

        credits: {
            enabled: false
        },

        title: {
            text: '',
            style: {
                color: getVarColor('--chart-text')
            }
        },

        xAxis: {
            categories: categories,
            lineColor: getVarColor('--chart-grid'),
            tickColor: getVarColor('--chart-grid'),
            labels: {
                style: {
                    color: getVarColor('--chart-subtext')
                }
            },
            title: {
                text: 'Week',
                style: {
                    color: getVarColor('--chart-text')
                }
            }
        },

        yAxis: {
            min: 0,
            gridLineColor: getVarColor('--chart-grid'),
            labels: {
                style: {
                    color: getVarColor('--chart-subtext')
                }
            },
            title: {
                text: 'Number of Tasks',
                style: {
                    color: getVarColor('--chart-text')
                }
            }
        },

        legend: {
            itemStyle: {
                color: getVarColor('--chart-text')
            },
            itemHoverStyle: {
                color: getVarColor('--primary')
            }
        },

        tooltip: {
            backgroundColor: getVarColor('--card'),
            borderColor: getVarColor('--border'),
            style: {
                color: getVarColor('--chart-text')
            }
        },

        plotOptions: {
            column: {
                borderRadius: 6, // nice modern touch
                borderWidth: 0
            }
        },

        colors: [
            getVarColor('--primary'), // Created
            getVarColor('--secondary'), // Completed
            getVarColor('--accent') // In Progress
        ],

        series: [
            {
                type: 'column',
                name: 'Created',
                data: created
            },
            {
                type: 'column',
                name: 'Completed',
                data: completedData
            },
            {
                type: 'column',
                name: 'In Progress',
                data: inProgressData
            }
        ]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}
