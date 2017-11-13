import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { signin } from '../../actions/session_actions';
import { isUserSignedIn } from 'blockstack';

class SignIn extends React.Component {
  componentDidMount() {
    if (isUserSignedIn()) this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="text-center welcome-text">
          <h2>Welcome!</h2>
          <h2>Sign in below.</h2>
        </div>
        <div className="login-box">
        <button onClick={ this.props.signin } className='btn transparent-btn'>
          Sign In With Blockstack
        </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signin: () => dispatch(signin())
});

export default withRouter(
  connect(null, mapDispatchToProps)(SignIn)
);
