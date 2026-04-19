import { getVarColor } from '@/app/lib/utils';
import { ISeries } from '@/app/types/chart';
import { ITaskDTO } from '@/app/types/task';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const transformDoughnutData = ({
    completedTasks,
    inProgressTasks,
    notStartedTasks,
}: {
    completedTasks: ITaskDTO[];
    inProgressTasks: ITaskDTO[];
    notStartedTasks: ITaskDTO[];
}) => {
    const series: ISeries[] = [];
    
    const totalSum = completedTasks.length + inProgressTasks.length + notStartedTasks.length;

    series.push({ color: '#4CAF50', y: completedTasks.length, name: 'Completed' });
    series.push({ color: '#2196F3', y: inProgressTasks.length, name: 'In-Progress' });
    series.push({ color: '#9E9E9E', y: notStartedTasks.length, name: 'Not Started' });
   
    return { series, totalSum };
};

export default function TaskCompletionOverview({
    completedTasks,
    inProgressTasks,
    notStartedTasks,
}: {
    completedTasks: ITaskDTO[] | null;
    inProgressTasks: ITaskDTO[] | null;
    notStartedTasks: ITaskDTO[] | null;
}) {
    if( !completedTasks || !inProgressTasks || !notStartedTasks ) {
        return <div>Loading...</div>;
    }
    
    const { series, totalSum } = transformDoughnutData({
        completedTasks,
        inProgressTasks,
        notStartedTasks
    });

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent'
        },
        credits: {
            enabled: false // disable the watermark ( the Highchart.com label in the right-bottom )
        },
        title: {
            text: `Total Tasks<br><b>${totalSum}</b>`,
            align: 'center',
            verticalAlign: 'middle',
            y: 20,
            style: {
                color: getVarColor('--chart-text'), // dynamic theme
                fontSize: '16px'
            }
        },
        tooltip: {
            pointFormat:
                '{series.name}: <b>{point.y:.0f}</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                innerSize: '60%', // makes it doughnut
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.percentage:.1f} %',
                    style: {
                        color: getVarColor('--chart-text'),
                        textOutline: 'none'
                    }
                }
            }
        },
        series: [
            {
                type: 'pie',
                name: 'Events',
                data: series
            }
        ]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}