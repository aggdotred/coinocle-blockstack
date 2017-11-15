import React from 'react';
export default class TVChart extends React.Component {

  componentDidMount() {

    const initScript = document.createElement("script");
    initScript.type = "text/javascript";
    initScript.innerHTML = 'new TradingView.MediumWidget({"container_id": "tv-medium-widget-a8ae1","symbols": [  "KRAKEN:XRPEUR|1y"],"gridLineColor": "#e9e9ea","fontColor": "#83888D","underLineColor": "#dbeffb","trendLineColor": "#4bafe9","width": "100%","height": "400px","locale": "en"})'
    document.body.appendChild(initScript);

  }

  render() {
    return (
        <div id="tv-medium-widget-a8ae1">asd</div>

    )
  }

}



