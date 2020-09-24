//handle all outcomes
const sendSuccess = (req, res) => {
	return msg => {
		res.status(200).write(msg);
		res.end();
	}
};

const sendFailure = (req, res) => {
	//TODO: more in-depth error handling
	return err => {
		res.status(400).write(err.stack || err);
		res.end();
	}
};

module.exports = {
	sendSuccess,
	sendFailure,
}