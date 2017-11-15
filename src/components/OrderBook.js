import React from 'react';
// import PropTypes from "prop-types";
import {last, first, timeIntervalBarWidth} from 'react-stockcharts/lib/utils';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {scaleLinear} from 'd3-scale';
import {ChartCanvas, Chart} from 'react-stockcharts';
import {AreaSeries} from 'react-stockcharts/lib/series';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {fitWidth} from 'react-stockcharts/lib/helper';
import {HoverTooltip} from 'react-stockcharts/lib/tooltip';
import {OrderBookTable} from './OrderBookTable';

class OrderBook extends React.Component {
  tooltipContent(ys) {

    const { currentItem } = ys;
    return {
      x: currentItem.price,
      y: [
        {
          label: currentItem.bid > 0 ? "Bid" : "Ask",
          value: currentItem.bid > 0 ? currentItem.bid : currentItem.ask
        }
      ]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const bids = this.props.data.bids;
    const nextBids = nextProps.data.bids;

    const asks = this.props.data.asks;
    const nextAsks = nextProps.data.asks;

    // Not the best condition but good enough for now
    return (bids.length !== nextBids.length) ||
        (bids.length > 0 && nextBids.length > 0 && bids[0][0] !== nextBids[0][0]);
  }

  render() {
    const { data } = this.props;

    const bids = data.bids;
    const asks = data.asks;
    if (data.asks.length === 0) {
      return (<div>Loading data</div>)
    }

    console.log('rerendering orderbook...')
    const cumasks = asks.reduce(function (r, a) {

      r.push([a[0], (r.length && r[r.length - 1][1] || 0) + a[1]]);
      return r;
    }, []);

    const cumbids = bids.reduce(function (r, a) {

      r.push([a[0], (r.length && r[r.length - 1][1] || 0) + a[1]]);
      return r;
    }, []);

    // TODO: optimise this
    const sortedBids = cumbids.sort((a, b) => (numeral(a[0]).value()) - numeral(b[0]).value());
    const askData = cumasks.map((a) => ({ price: a[0], ask: a[1], bid: 0 }));
    const bidData = sortedBids.map((a) => ({ price: a[0], ask: 0, bid: a[1] }));
    const final = bidData.concat(askData);
    const xExtents = [numeral(first(final).price).value(), numeral(last(final).price).value()];

    return (
        <ChartCanvas ratio={2} width={1100} height={400}
                     margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                     zoomEvent={false}
                     panEvent={false}
                     seriesName="MSFT"
                     data={final}
                     type="svg"
                     xAccessor={d => d ? numeral(d.price).value() : null}
                     displayXAccessor={d => d ? numeral(d.price).value() : null}
                     xScale={scaleLinear()}
                     xExtents={xExtents}>
          <Chart id={1} yExtents={d => Math.max(d.ask, d.bid)}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
            <YAxis axisAt="left" orient="left"/>
            <AreaSeries
                yAccessor={d => d.bid}
                stroke="#6BA16E"
                fill="#93DE7F"
            />
            <AreaSeries
                yAccessor={d => d.ask}
                stroke="#E36B6B"
                fill="#F6C1C1"
            />

            <HoverTooltip
                yAccessor={d => d.ask}
                tooltipContent={this.tooltipContent}

                fontSize={15}/>
          </Chart>
        </ChartCanvas>
    );
  }
}


OrderBook.propTypes = {
  data: PropTypes.object.isRequired,
};

OrderBook.defaultProps = {
  type: "svg",
};
OrderBook = fitWidth(OrderBook);

export default OrderBook;
