import React from 'react';
import PropTypes from 'prop-types';

import validateEmail from '../../utilities/validate-email';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			retype: '',
		};
	}

	render() {
		return (
			<div className='panel right'>
				<h1 className='centered'>Sign Up</h1>

				<form action='/api/signup' method='post' onSubmit={this.submit.bind(this)}>
					<div>
						<label htmlFor='email'>Email:</label>
						<input required id='email' type='email' name='email' value={this.state.email} onChange={ evt => this.setState({ email: evt.target.value }) } />
					</div>

					<div>
						<label htmlFor='username'>User Name:</label>
						<input required id='username' type='text' name='username' value={this.state.username} onChange={ evt => this.setState({ username: evt.target.value }) } />
					</div>

					<div>
						<label htmlFor='password'>Password:</label>
						<input required id='password' type='password' name='password' value={this.state.password} onChange={ evt => this.setState({ password: evt.target.value }) } />
					</div>

					<div>
						<label htmlFor='retype'>Retype Password:</label>
						<input required id='retype' type='password' name='retype' value={this.state.retype} onChange={ evt => this.setState({ retype: evt.target.value }) } />
					</div>

					<button type='submit' disabled={!this.state.email  || !this.state.username || !this.state.password || !this.state.retype}>Sign Up</button>
				</form>
			</div>
		);
	}

	submit(e) {
		e.preventDefault();

		//build and validate the formData
		let form = e.target;
		let formData = new FormData(form);

		//BUGFIX: trim the input data
		const email = formData.get('email');
		formData.delete('email');
		formData.append('email', email.trim());

		const username = formData.get('username');
		formData.delete('username');
		formData.append('username', username.trim());

		if (!this.validateInput(formData.get('email'), formData.get('username'), formData.get('password'), formData.get('retype'))) {
			return;
		}

		//send the request
		fetch(form.action, {
			method: 'POST',
			body: formData
		})
			.then(res => {
				if (res.ok) {
					this.clearInput();
					return res.text().then(text => this.props.onSuccess(text));
				} else {
					throw `${res.status}: ${res.statusText}`;
				}
			})
			.catch(err => this.props.setWarning(err))
		;
	}

	//will be validated server-side too
	validateInput(email, username, password, retype) {
		if (!validateEmail(email)) {
			this.props.setWarning('Invalid Email');
			return false;
		}
		if (username.length < 4) {
			this.props.setWarning('Minimum username length is 4 characters');
			return false;
		}
		if (username.length > 100) {
			this.props.setWarning('Maximum username length is 100 characters');
			return false;
		}
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

	//text controllers
	clearInput() {
		this.setState({ email: '', username: '', password: '', retype: '' });
	}
};

Signup.propTypes = {
	onSuccess: PropTypes.func.isRequired,
	setWarning: PropTypes.func.isRequired,
};

export default Signup;
