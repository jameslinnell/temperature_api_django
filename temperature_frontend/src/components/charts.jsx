import {Line} from 'react-chartjs-2';

export const renderChart = (state) => {
    return(
        <div>
        <Line
            data={{
                labels: state.labels,
                datasets: state.dataset
            }}
            options={{
            responsive: true,
                plugins: {
                    title:{
                    display:false,
                    text:'Temperature over a 24 Hour period',
                    fontSize:20
                    },
                    legend:{
                    display:false,
                    position:'right'
                    }
                }
            }}
        />
        </div>
    );
}

export const renderChart_no_limit = (state) => {
    return(
        <div>
        <Line
            data={{
                labels: state.labels_no_limit,
                datasets: state.dataset_no_limit
            }}
            options={{
                responsive: true,
                plugins: {
                    title:{
                    display:false,
                    text:'Temperature over all time.',
                    fontSize:20
                    },
                    legend:{
                    display:false,
                    position:'right'
                    }
                }
            }}
        />
        </div>
    );
}