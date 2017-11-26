import React from 'react';
import {Link} from 'react-router-dom';
import {Form, FormGroup, Input, InputGroup} from 'reactstrap';

export default class TransactionFileAdd extends React.Component {
  static PropTypes = {}

  constructor(props) {
    super(props);
    this.state = { isEditing: true };
  }

  startEdit() {
    this.props.updateTransactionInput(this.props.value);
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
    this.props.onSave(this.props.date, value)
  };

  cancel() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  };

  render() {

    const signinElem = (
        <div>
          <a onClick={this.props.signin}>Sign in to change</a>
        </div>
    );
    const editLink = (
        <div>
          <a onClick={this.startEdit.bind(this)}>Change</a>
        </div>
    );

    const editLinkElem = (!!this.props.user ? editLink : signinElem);

    const editElem = (
        <div>
          <Form className="addwalletform" onSubmit={() => {this.save(this.props.transactionInput)}}>

              <FormGroup>
                <InputGroup className="wallet-input">
                  <Input value={this.props.transactionInput}
                         onChange={(e) => this.props.updateTransactionInput(e.target.value)}
                         name="transactions" id="transactions"
                         className="wallet-input"
                         type="number"
                         placeholder="Something here"/>
                </InputGroup>
              </FormGroup>
              <small className="text-muted">Something</small>

          </Form>
          <div>
            <Link to={"/"}><button className="wallet-save" onClick={() => this.save(this.props.transactionInput)}>Save</button></Link>
            <Link to={"/"}><button className="cancel">Cancel</button></Link>
          </div>
        </div>
    );

    const viewElem = (
        <div>
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
