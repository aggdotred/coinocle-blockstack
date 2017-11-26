import React from 'react';
import {scaleTime} from 'd3-scale';
import {timeFormat} from 'd3-time-format';
import {format} from 'd3-format';
import {ChartCanvas, Chart} from 'react-stockcharts';
import {LineSeries} from 'react-stockcharts/lib/series';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {fitWidth} from 'react-stockcharts/lib/helper';
import {last, first} from 'react-stockcharts/lib/utils';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates';
import Loading from './Loading';
import {PRICE_CHART_ERROR_DATA_NA} from '../modules/coin';


class PriceChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      period: 300
    }
  }

  changePeriod(period) {
    this.setState({
      period: period
    });
    this.props.loadCoinChartData(this.props.coin.symbol, period);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.width !== nextProps.width ||
        this.props.coin.id !== nextProps.coin.id ||
        this.state.period !== nextState.period ||
        this.props.data.length !== nextProps.data.length ||
        this.props.priceChartError !== nextProps.priceChartError ||
        (this.props.data.length > 0 && nextProps.data.length > 0 && this.props.data[0].date !== nextProps.data[0].data);
  }

  render() {
    if (this.props.priceChartError === PRICE_CHART_ERROR_DATA_NA) {
      return (
          <h5 className="mt-5 text-center text-danger">At the moment there is not data available for
            this coin.</h5>
      )
    }
    const {ratio, data } = this.props;

    const xAccessor = (d) => {

      return d ? new Date(d.date * 1000) : new Date()
    };
    if (!this.props.data || !this.props.data.length > 0) {
      return (<h3 className="mt-5 text-center"><Loading/></h3>)
    }
    const xExtents = [
      xAccessor(first(data)),
      xAccessor(last(data))
    ];
    console.log(data);
    const periods = [[300, '24h'], [900, '72h'], [1800, '1wk'], [7200, '1mth'], [14400, '2mth'], [86400, '1yr']];
    const periodLinks = periods.map((p) => {
      return p[0] === this.state.period ? (
              <span key={p[1]} className="mr-3 period-link"><strong>{p[1]}</strong></span>) : (
              <a key={p[1]} className="mr-3 period-link"
                 onClick={() => this.changePeriod(p[0])}>{p[1]}</a>
          )
    });
    return (
        <div>
          <div className="text-center historical-links">
            {periodLinks}
          </div>
          <ChartCanvas width={1000} height={400} ratio={ratio}
                       panEvent={false}
                       zoomEvent={false}
                       margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                       seriesName="MSFT"
                       data={data} type="svg"
                       xAccessor={xAccessor}
                       xScale={scaleTime()}
                       xExtents={xExtents}>
            <Chart id={0} yExtents={d => [d.close / 1.1, d.close]} yPan={true}>
              <XAxis axisAt="bottom" orient="bottom" ticks={10}/>
              <YAxis axisAt="left" orient="left"/>
              <LineSeries yAccessor={d => d.close}/>
              <MouseCoordinateX
                  at="bottom"
                  orient="bottom"
                  displayFormat={timeFormat("%Y-%m-%d")}/>
              <MouseCoordinateY
                  at="right"
                  orient="right"
                  displayFormat={format(".2f")}/>

            </Chart>
            <CrossHairCursor />

          </ChartCanvas>

        </div>
    );
  }
}

PriceChart.defaultProps = {
  type: "svg",
};
PriceChart = fitWidth(PriceChart);

export default PriceChart;
