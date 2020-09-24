import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//panels
import SignupPanel from '../panels/signup';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			signupMessage: '', //the signup message from the server
			warning: '',
		};
	}

	componentDidMount() {
		//already logged in
		if (this.props.loggedIn) {
			this.props.history.push('/');
		}
	}

	render() {
		let Panel;

		if (!this.state.signupMessage) {
			Panel = () => {
				return (
					<SignupPanel onSuccess={ msg => this.setState({ signupMessage: msg }) } setWarning={ msg => this.setState({ warning: msg }) } />
				);
			}
		} else {
			Panel = () => {
				return (
					<p className='centered'>{this.state.signupMessage}</p>
				);
			}
		}

		return (
			<div className='page constrained'>
				<p className='warning' style={{display: !this.state.warning ? 'none' : 'flex'}}>{this.state.warning}</p>
				<Panel />
				<div className='break' />
				<button href='/' className='centered'>Return Home</button>
				<div className='break' />
				<p className='centered'><em>(Remember to verify your email!)</em></p>
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

Signup = connect(mapStoreToProps, mapDispatchToProps)(Signup);

export default withRouter(Signup);
