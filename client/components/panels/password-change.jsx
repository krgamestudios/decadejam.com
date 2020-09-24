import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PasswordChange extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			oldPassword: '',
			newPassword: '',
			retype: ''
		};
	}

	render() {
		return (
			<div className='panel right'>
				<h1 className='centered'>Change Password</h1>

				<form action='/api/passwordchange' method='post' onSubmit={this.submit.bind(this)}>
					<div>
						<label htmlFor='oldpassword'>Old Password:</label>
						<input required id='oldpassword' type='password' name='oldpassword' value={this.state.oldPassword} onChange={ evt => this.setState({ oldPassword: evt.target.value }) } />
					</div>

					<div>
						<label htmlFor='newpassword'>New Password:</label>
						<input required id='newpassword' type='password' name='newpassword' value={this.state.newPassword} onChange={ evt => this.setState({ newPassword: evt.target.value }) } />
					</div>

					<div>
						<label htmlFor='retype'>Retype New Password:</label>
						<input required id='retype' type='password' name='retype' value={this.state.retype} onChange={ evt => this.setState({ retype: evt.target.value }) } />
					</div>

					<button type='submit'>Change Password</button>
				</form>
			</div>
		);
	}

	submit(e) {
		e.preventDefault();

		if (!this.validateInput()) {
			return;
		}

		//build the XHR (around an existing form object)
		let form = e.target;
		let formData = new FormData(form);

		formData.append('id', this.props.id);
		formData.append('token', this.props.token);

		//send the request
		fetch(formData.action, {
			method: 'post',
			body: formData
		})
			.then(res => {
				if (res.ok) {
					this.clearInput();
					return res.text().then(text => this.props.onSuccess(text));
				} else {
					res.error().text().then(text => {
						throw text;
					});
				}
			})
			.catch(err => this.props.setWarning(err))
		;
	}

	validateInput(e) {
		if (this.state.newPassword.length < 8) {
			this.props.setWarning('Minimum password length is 8 characters');
			return false;
		}

		if (this.state.newPassword !== this.state.retype) {
			this.props.setWarning('Passwords do not match');
			return false;
		}

		return true;
	}

	clearInput() {
		this.setState({ oldPassword: '', newPassword: '', retype: '' });
	}
};

PasswordChange.propTypes = {
	id: PropTypes.number.isRequired,
	token: PropTypes.number.isRequired,

	onSuccess: PropTypes.func
};

const mapStoreToProps = (store) => {
	return {
		id: store.account.id,
		token: store.account.token
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//
	};
};

PasswordChange = connect(mapStoreToProps, mapDispatchToProps)(PasswordChange);

export default PasswordChange;
