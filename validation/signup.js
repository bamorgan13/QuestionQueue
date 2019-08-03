const Validator = require('validator');
const validText = require('./valid-text');
const User = require('../models/User');

module.exports = function validateSignupInput(data) {
	data.name = validText(data.name) ? data.name : '';
	data.email = validText(data.email) ? data.email : '';
	data.password = validText(data.password) ? data.password : '';

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		return {
			message: 'Name must be between 2 and 30 characters',
			isValid: false
		};
	}

	if (Validator.isEmpty(data.name)) {
		return { message: 'Name field is required', isValid: false };
	}

	if (Validator.isEmpty(data.email)) {
		return { message: 'Email field is required', isValid: false };
	}

	if (!Validator.isEmail(data.email)) {
		return { message: 'Email is invalid', isValid: false };
	}

	if (Validator.isEmpty(data.password)) {
		return { message: 'Password field is required', isValid: false };
	}

	if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
		return {
			message: 'Password must be at least 8 characters',
			isValid: false
		};
	}

	return {
		message: '',
		isValid: true
	};
};
