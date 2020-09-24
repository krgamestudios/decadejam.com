const formidable = require('formidable');

module.exports = (req, opts) => {
	return new Promise((resolve, reject) => {
		let form = new formidable.IncomingForm(opts);
		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			return resolve({ fields: fields, files: files });
		});
	});
};
