import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

//panels
import LoginPanel from '../panels/login';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		//already logged in
		if (this.props.loggedIn) {
			this.props.history.push('/');
		}
	}

	//TODO: redirect to profile
	render() {
		return (
			<div className='page constrained'>
				<LoginPanel onSuccess={(msg) => this.props.history.push('/')} />
				<div className='break' />
				<button href='/' className='centered'>Return Home</button>
			</div>
		);
	}
};

const mapStoreToProps = (store) => {
	return {
		loggedIn: !!store.account.id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//
	};
};

Login = connect(mapStoreToProps, mapDispatchToProps)(Login);

export default withRouter(Login);
