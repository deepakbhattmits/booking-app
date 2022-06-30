import {FC} from 'react';
import {Bar as BarChart} from 'react-chartjs-2'
// import useDimensions from '../../hooks/useDimensions'
interface IProp {
    [props:string]:any
}

const BookingChart: FC<IProp>=({bookings,isLoading}): JSX.Element =>{
	// const {width,height}=useDimensions();	
const BOOKINGS_BUCKETS:any = {
  Cheap: {
    min: 0,
    max: 100
  },
  Normal: {
    min: 100,
    max: 200
  },
  Expensive: {
    min: 200,
    max: 10000000
  }
	};
	const options={
		maintainAspectRatio: false,
		responsive: true,
      plugins: {
    legend: {
      display: false,
    },
  },
    
		};
	 const chartData:any = { labels: [], datasets: [] };
  let values:any = [];
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev:any, current:any) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      // label: "My First dataset",
      fillColor: 'rgba(100, 53, 201,1)',
      strokeColor: 'rgba(100, 53, 201,1)',
      highlightFill: 'rgba(100, 53, 201,1)',
      highlightStroke: 'rgba(100, 53, 201,1)',
      data: values
    });
    values = [...values];
    values[values.length - 1] = 0;
  }
  return <div className="ui bookings__section--chart">
			<BarChart
				options={options}
				data={chartData}
				// redraw
			/>
    	</div>;
}
export default BookingChart;
