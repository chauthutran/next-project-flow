import { JSONObject } from '@/app/lib/definations';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const convertToBarChart = (data: JSONObject[]) => {
    const categories = data.map((item) => `${item._id.year}-W${item._id.week}`);

    const created = data.map((item) => item.created);
    const completedData = data.map((item) => item.completed);
    const inProgressData = data.map((item) => item.in_progress);

    return { categories, created, completedData, inProgressData };
};

export default function WeeklyProgressTrend({data} : {data: JSONObject[] | null}) {
    
    if(!data) return <div>Loading ...</div>;
    
    const { categories, created, completedData, inProgressData } = convertToBarChart(data);

    const options: Highcharts.Options = {
        chart: {
            type: 'column', // bar chart (vertical)
            backgroundColor: 'transparent'
        },
        credits: {
            enabled: false // disable the watermark ( the Highchart.com label in the right-bottom )
        },
        title: {
            text: 'Weekly Task Progress'
        },
        xAxis: {
            categories: categories,
            title: {
                text: 'Week'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Tasks'
            }
        },
        series: [
            {
                name: 'Created',
                data: created
            },
            {
                name: 'Completed',
                data: completedData
            },
            {
                name: 'In Progress',
                data: inProgressData
            }
        ]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}
