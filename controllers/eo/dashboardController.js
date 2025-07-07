// controllers/eventController.js
const db = require('../../config/db');

// READ profile (by token)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
    const user = await db.users.findOne({
      where: { id: userId },
      attributes: ['id', 'username', 'email', 'photo_path', 'role', 'createdAt', 'updatedAt']
    });
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    res.json({ status: 'success', data: user });
  } catch (err) {
    console.error('Get user profile error:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch user profile' });
  }
};

// READ all events for this EO
exports.getAllEvents = async (req, res) => {
  try {
    const eoId = req.user && req.user.id;
    const events = await db.events.findAll({
      where: { eo_id: eoId },
      order: [['start_date', 'ASC']],
      attributes: ['id', 'eo_id', 'nama', 'deskripsi', 'start_date', 'end_date', 'lokasi', 'createdAt', 'updatedAt']
    });
    res.json({ status: 'success', data: events });
  } catch (err) {
    console.error('Get events error:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch events' });
  }
};