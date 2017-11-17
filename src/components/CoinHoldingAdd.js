import React from 'react';
import numeral from 'numeral';
import {coinPageInfo} from '../modules/message';
import {Link} from 'react-router-dom';
import {Form, FormGroup, Input, InputGroup, InputGroupAddon} from 'reactstrap';

export default class CoinHoldingAdd extends React.Component {
  static PropTypes = {}

  constructor(props) {
    super(props);
    this.state = { isEditing: true };
  }

  startEdit() {
    this.props.updateHoldingInput(this.props.value);
    this.setState({
      isEditing: true
    })
  };

  inputChange(e) {
    this.setState({
      ...this.state,
    })
  }

  save(value) {
    this.setState({
      ...this.state,
      isEditing: false
    })
    this.props.onSave(this.props.coin.id, value)
  };

  cancel() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  };

  render() {
    const coin = this.props.coin;

    const signinElem = (
        <div>
          <a onClick={this.props.signin} href="#">Sign in to change</a>
        </div>
    );
    const editLink = (
        <div>
          <a onClick={this.startEdit.bind(this)} href="#">Change</a>
        </div>
    );

    const editLinkElem = (!!this.props.user ? editLink : signinElem);

    const editElem = (
        <div>
          <Form className="addwalletform" onSubmit={() => {this.save(this.props.holdingInput)}}>

              <FormGroup>
                <InputGroup className="wallet-input">
                  <Input value={this.props.holdingInput}
                         onChange={(e) => this.props.updateHoldingInput(e.target.value)}
                         name="holdings" id="holdings"
                         className="wallet-input"
                         type="number"
                         placeholder="Coins owned"/>
                </InputGroup>
              </FormGroup>
              <small className="text-muted">{coinPageInfo.holdings}</small>

          </Form>
          <div>
            <Link to={"/"}><button className="wallet-save" onClick={() => this.save(this.props.holdingInput)}>Save</button></Link>
            <Link to={"/wallet/new"}><button className="cancel">Cancel</button></Link>
          </div>
        </div>
    );

    const viewElem = (
        <div>
          <h4>{this.props.value} {coin.symbol}
            <small className="text-muted"><br/>{coinPageInfo.holdings}</small>
          </h4>
          {editLinkElem}
        </div>
    );

    const element = this.state.isEditing ? editElem : viewElem;
    return (
        <div>
          {element}
        </div>
    )
  }
}
