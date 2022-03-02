const express = require ('express');
const post = express.Router();
const User = require('../models/LogistiqSchema');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// add a new user to the db
post.post('/register', async (req, res) => {
	
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
    const duplicateEmail = await User.findOne({
      email: req.body.email,
    })
    if (duplicateEmail) return res.json({message: "Email already exist, please login or try another email"})
		const user = await User.create({
			Username: req.body.Username,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' , user})
	} catch (err) {
		res.json({ status: 'error', error: 'Oops, something went wrong, please wait' })
	}
})

post.post('/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				Username: user.Username,
				email: user.email,
			},
			process.env.SECRET
		)

		return res.json({ status: 'ok', user: token})
	} else {
		return res.json({ status: 'error', user: false })
	}
})

module.exports = post;