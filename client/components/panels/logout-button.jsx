import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/account';

class LogoutButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<button onClick={ this.onClick.bind(this) }>Logout</button>
		);
	}

	onClick(e) {
		let formData = new FormData();
		formData.append('id', this.props.id);
		formData.append('token', this.props.token);

		fetch('/api/logout', {
			method: 'post',
			body: formData
		})
			.then(res => {
				if (res.ok) {
					this.props.logout();
					return res.text().then(text => this.props.onSuccess(text));
				} else {
					res.error().text().then(text => {
						throw text;
					});
				}
			})
			.catch(err => this.props.setWarning(err))
		;

		if (this.props.onClick) {
			this.props.onClick();
		}
	}
};

LogoutButton.propTypes = {
	id: PropTypes.number.isRequired,
	token: PropTypes.number.isRequired,
	logout: PropTypes.func.isRequired,

	onClick: PropTypes.func
};

const mapStoreToProps = (store) => {
	return {
		id: store.account.id,
		token: store.account.token
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => { dispatch(logout()) }
	}
};

LogoutButton = connect(mapStoreToProps, mapDispatchToProps)(LogoutButton);

export default LogoutButton;
