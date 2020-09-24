import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/account';
import validateEmail from '../../utilities/validate-email';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	render() {
		return (
			<div className='panel right'>
				<h1 className='centered'>Login</h1>

				<form action='/api/login' method='post' onSubmit={ this.submit.bind(this) } >
					<div>
						<label htmlFor='email'>Email:</label>
						<input required id='email' type='email' name='email' value={this.state.email} onChange={ evt => this.setState({ email: evt.target.value }) } />
					</div>

					<div>
						<label htmlFor='password'>Password:</label>
						<input required id='password' type='password' name='password' value={this.state.password} onChange={ evt => this.setState({ password: evt.target.value }) } />
					</div>

					<button type='submit' disabled={!this.state.email}>Login</button>
				</form>
			</div>
		);
	}

	submit(e) {
		e.preventDefault();

		//build and validate the form data
		let form = e.target;
		let formData = new FormData(form);

		//BUGFIX: trim the input data
		const email = formData.get('email');
		formData.delete('email');
		formData.append('email', email.trim());

		if (!this.validateInput(formData.get('email'), formData.get('password'))) {
			return;
		}

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

	validateInput(email, password) {
		if (!validateEmail(email)) {
			this.props.setWarning('Invalid Email');
			return false;
		}

		if (password.length < 8) {
			this.props.setWarning('Minimum password length is 8 characters');
			return false;
		}

		return true;
	}

	clearInput() {
		this.setState({ email: '', password: '', warning: '' });
	}
};

Login.propTypes = {
	login: PropTypes.func.isRequired,

	onSubmit: PropTypes.func
};

const mapStoreToProps = (store) => {
	return {
		//
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (id, token) => dispatch(login(id, token))
	}
};

Login = connect(mapStoreToProps, mapDispatchToProps)(Login);

export default Login;
