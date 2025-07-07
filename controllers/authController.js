// controllers/authController.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ status: 'fail', message: 'Semua kolom wajib diisi' });
    }
    try {
        const exists = await db.users.findOne({ where: { email } });
        if (exists) {
            return res.status(409).json({ status: 'fail', message: 'Email sudah terdaftar' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await db.users.create({ username, email, password: hashed });
        res.status(201).json({
            status: 'success',
            data: { id: user.id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 'fail', message: 'Semua kolom wajib diisi' });
    }

    try {
        const user = await db.users.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'Email atau password salah' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ status: 'fail', message: 'Email atau password salah' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Tambahkan pesan role yang login
        let roleMessage = '';
        if (user.role === 'EO') {
            roleMessage = 'Anda login sebagai Event Organizer (EO)';
        } else if (user.role === 'User') {
            roleMessage = 'Anda login sebagai User';
        } else {
            roleMessage = `Anda login sebagai ${user.role}`;
        }

        return res.json({
            status: 'success',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            message: roleMessage
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

exports.logout = (req, res) => {
    // Stateless JWT: client cukup buang token
    res.json({ status: 'success', message: 'Logout berhasil' });
};
