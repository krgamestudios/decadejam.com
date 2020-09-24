import React from 'react';
import validateEmail from '../../utilities/validate-email';
import PropTypes from 'prop-types';

class PasswordRecovery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: ''
		};
	}

	render() {
		return (
			<div className='panel right'>
				<h1 className='centered'>Recover Password</h1>

				<form action='/api/passwordrecovery' method='post' onSubmit={this.submit.bind(this)}>
					<div>
						<label htmlFor='email'>Email:</label>
						<input required id='email' type='email' name='email' value={this.state.email} onChange={ evt => this.setState({ email: evt.target.value }) } />
					</div>

					<button type='submit' disabled={!this.state.email}>Send Email</button>
				</form>
			</div>
		);
	}

	submit(e) {
		e.preventDefault();

		if (!this.validateInput(this.state.email)) {
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

	validateInput(e) {
		if (!validateEmail(e)) {
			this.props.setWarning('Invalid Email');
			return false;
		}

		return true;
	}

	clearInput() {
		this.setState({ email: '' });
	}
};

PasswordRecovery.propTypes = {
	onSuccess: PropTypes.func
};

export default PasswordRecovery;
