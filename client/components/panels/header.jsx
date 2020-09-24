import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import LogoutButton from './logout-button';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.loggedIn) {
			return this.renderLoggedIn();
		} else {
			return this.renderLoggedOut();
		}
	}

	renderLoggedIn() {
		return (
			<header className='page-header centered'>
				<Link to='/'>Decade Jam!</Link>

				<Link to='/profile'>Profile</Link>
				<Link to='/passwordchange'>Password</Link>
				<Link to='/privacy'>Privacy</Link>
				<LogoutButton onClick={() => this.props.history.push('/')} />
			</header>
		);
	}

	renderLoggedOut() {
		return (
			<header className='page-header centered'>
				<Link to='/'>Decade Jam!</Link>

				<Link to='/login'>Login</Link>
				<Link to='/signup'>Signup</Link>
				<Link to='/passwordrecovery'>Recovery</Link>
			</header>
		);
	}
};

const mapStoreToProps = (store, ownProps) => {
	return {
		loggedIn: store.account.id !== undefined && store.account.id !== 0
	}
};

const mapDispatchToProps = (dispatch,  ownProps) => {
	return {
		//
	}
};


Header = connect(mapStoreToProps, mapDispatchToProps)(Header);

export default withRouter(Header);
