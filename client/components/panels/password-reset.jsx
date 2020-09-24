import React from 'react';
import PropTypes from 'prop-types';

class PasswordReset extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			retype: '',
		};
	}

	render() {
		return (
			<div className='panel right'>
				<h1 className='centered'>New Password</h1>

				<form action='/api/passwordreset' method='post' onSubmit={this.submit.bind(this)}>
					<div>
						<label htmlFor='password'>Password:</label>
						<input required id='password' type='password' name='password' value={this.state.password} onChange={ evt => this.setState({ password: evt.target.value }) } />
					</div>

					<div>
						<label htmlFor='retype'>Retype Password:</label>
						<input required id='retype' type='password' name='retype' value={this.state.retype} onChange={ evt => this.setState({ retype: evt.target.value }) } />
					</div>

					<button type='submit'>New Password</button>
				</form>
			</div>
		);
	}

	submit(e) {
		e.preventDefault();

		if (!this.validateInput(this.state.password, this.state.retype)) {
			return;
		}

		//build the XHR
		let form = e.target;
		let formData = new FormData(form);

		formData.append('email', this.props.email);
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

	validateInput(password, retype) {
		if (password.length < 8) {
			this.props.setWarning('Minimum password length is 8 characters');
			return false;
		}

		if (password !== retype) {
			this.props.setWarning('Passwords do not match');
			return false;
		}

		return true;
	}

	clearInput() {
		this.setState({ password: '', retype: '' });
	}
};

PasswordReset.propTypes = {
	email: PropTypes.string.isRequired,
	token: PropTypes.number.isRequired,

	onSuccess: PropTypes.func
};

export default PasswordReset;
