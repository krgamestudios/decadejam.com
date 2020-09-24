//libraries
const util = require('util');
const bcrypt = require('bcrypt');
const sendmail = require('sendmail')({silent: true});
const { v4: uuid } = require('uuid');

//utilities
const { sendSuccess, sendFailure } = require('../../utilities/generic-callbacks');
const validateEmail = require('../../utilities/validate-email');
const formidablePromise = require('../../utilities/formidable-promise');

const { Account, Ban, Signup } = require('../../database');

module.exports = (req, res) => {
	console.log('beginning signup');
	return formidablePromise(req)
		.then(req => req.fields)
		.then(validateSignupDetails)
		.then(saveToDatabase)
		.then(sendSignupEmail)
		.then(sendSuccess(req, res))
		.catch(sendFailure(req, res))
	;
};

const validateSignupDetails = async fields => {
	//validate email, username and password
	if (!validateEmail(fields.email) || fields.username.length < 4 || fields.username.length > 100 || fields.password.length < 8 || fields.password !== fields.retype) {
		throw 'Invalid signup data';
	}

	//check to see if the email has been banned
	if (Ban.find({ email: fields.email }).count() > 0) {
		throw 'This email account has been banned!';
	}

	//check if email, username already exists
	if (Account.find({ email: fields.email }) > 0) {
		throw 'Email already registered!';
	}

	if (Account.find({ username: fields.username }) > 0) {
		throw 'Username already registered!';
	}

	//pass to the next callback
	return fields;
};

const saveToDatabase = async fields => {
	//generate the hash
	const salt = await bcrypt.genSalt(11);
	const hash = await bcrypt.hash(fields.password, salt);

	//generate a random signup token
	const token = uuid();

	//save the generated data to the signups collection
	const signup = new Signup({
		email: fields.email,
		username: fields.username,
		hash: hash,
		token: token,
	});

	signup.save(err => console.log(err));

	return { token, ...fields };
};

const sendSignupEmail = async fields => {
	const send = util.promisify(sendmail);

	//build the msg
	const addr = `https://${process.env.WEB_ADDRESS}/api/verify?token=${fields.token}`
	const msg = 'Hello! Please visit the following address to verify your account: ';

	//TODO: add encryption
	await send({
		from: `signup@${process.env.WEB_ADDRESS}`,
		to: fields.email,
		subject: 'Email Verification',
		text: msg + addr,
	}).catch(e => {
			throw 'Something went wrong in the email: ' + JSON.stringify(e);
		})
	;

	return `Verification email sent! ${fields.email} - ${fields.username}`;
};

