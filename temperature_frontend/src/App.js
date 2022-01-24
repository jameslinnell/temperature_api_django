import './App.css';
import axios from "axios"
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import Moment from 'moment';
import {calculateLabel, calculateLabel_no_limit} from './utils/chartLabelUtils'
import {setAverageTemp, setLowestHighest} from './utils/temperatureCalculations'
import {renderData, renderData_no_limit} from './components/data'
import { renderChart, renderChart_no_limit} from './components/charts'

import Container from 'react-bootstrap/Container';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_no_limit: [],
      labels: [],
      labels_no_limit: [],
      dataset: [],
      dataset_no_limit: [],
      lowest: 100.0,
      highest: 0.0,
      average: 0.0,
      current_temp: 0.0,
      lowest_no_limit: 100.0,
      highest_no_limit: 0.0,
      average_no_limit: 0.0,
      container_1: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      container_1: !this.state.container_1
    })
  }

  componentDidMount() {
    this.refreshData();
    this.refreshDataNoLimit();
    try {
      setInterval(async () => {
        this.refreshData();
        this.refreshDataNoLimit();
      }, 300000)
    } catch(e) {
      console.log(e)
    }
  }

  /***
   * TODO: remove url from here and put in package.json or even better an env variable.
   * TODO: making 2 unecessary calls here. Probably better to make on that is limitless and then take the last 96 records.
   */
  async refreshData() {
    await axios
      .get(`http://127.0.0.1:8000/api/temperature_readings/?ordering=-value_datetime&limit=96`)
      .then((res) => {
        this.setData(res, true)
      })
      .catch((err) => console.log(err))
  }

  async refreshDataNoLimit() {
    await axios
      .get(`http://127.0.0.1:8000/api/temperature_readings/?ordering=value_datetime`)
      .then((res) => {
        this.setData(res, false)
      })
      .catch((err) => console.log(err))
  }

  setData = (result, twentyFour) => {
    let labels = []
    let label = " "
    let data = []
    let data_mean = []
    let data_median = []
    let data_mode = []
    let data_percentile25 = []
    if (twentyFour === true) {
      result.data.results.reverse();
      result.data.results.forEach(element => {
        label = calculateLabel(Moment(element.value_datetime).format('HH'), Moment(element.value_datetime).format('mm'))
        labels.push(label)
        data.push(element.value);
      });
    } else {
      result.data.forEach(element => {
        label = calculateLabel_no_limit(Moment(element.value_datetime).format('HH'), Moment(element.value_datetime).format('mm'))
        labels.push(label)
        data.push(element.value);
        data_mean.push(element.mean);
        data_median.push(element.median);
        data_mode.push(element.mode);
        data_percentile25.push(element.percentile25);
      });
    }
    let minMax = setLowestHighest(data);
    let avg = setAverageTemp(data)
    if (twentyFour === true) {
      this.setState({
        data: result.data.results,
        labels: labels,
        dataset: [{
          label: 'Temperature',
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          data: data
        }],
        lowest: minMax.low,
        highest: minMax.high,
        current_temp: minMax.current,
        average: avg
      })
    } else {
      this.setState({
        data_no_limit: result.data,
        labels_no_limit: labels,
        dataset_no_limit: [{
          label: 'Temperature',
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(53, 162, 235, 1)',
          borderColor: 'rgba(53, 162, 235, 1)',
          borderWidth: 2,
          data: data
        },
        {
          label: 'Mean Avg.',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(50, 168, 82, 0.5)',
          borderColor: 'rgba(50, 168, 82, 0.5)',
          borderWidth: 0.1,
          borderDash: [5, 5],
          data: data_mean
        },
        {
          label: '25% percentile',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(230, 127, 9, 0.5)',
          borderColor: 'rgba(230, 127, 9, 0.5)',
          borderWidth: 0.1,
          borderDash: [5, 5],
          data: data_percentile25
        }],
        lowest_no_limit: minMax.low,
        highest_no_limit: minMax.high,
        current_temp: minMax.current,
        average_no_limit: avg
      })
    }
  }

  render = () => {
    const content = this.state.container_1
    ? <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Room Temperature Chart - All time</h1>{renderData_no_limit(this.state)}
        {renderChart_no_limit(this.state)}
      </Container>
    : <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Room Temperature Chart - 24Hr period</h1>{renderData(this.state)}
        {renderChart(this.state)}
      </Container>;
    
    return (
      <>
        <Container className='p-3'>
          <Container className="p-2 mb-0 bg-light rounded-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={ this.state.container_1 } onChange={ this.handleChange } />
              <label class="form-check-label" for="flexSwitchCheckDefault">24 Hrs / All time</label>
            </div>
          </Container>
          { content }
        </Container>
      </>
    );
  }
}

export default App;
