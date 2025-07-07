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

// UPDATE profile (by token)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
    const { username, email, photo_path } = req.body;
    if (!username || !email) {
      return res.status(400).json({ status: 'fail', message: 'Username dan email wajib diisi' });
    }
    const user = await db.users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    user.username = username;
    user.email = email;
    if (photo_path !== undefined) user.photo_path = photo_path;
    await user.save();
    const updatedUser = await db.users.findOne({
      where: { id: userId },
      attributes: ['id', 'username', 'email', 'photo_path', 'role', 'createdAt', 'updatedAt']
    });
    res.json({ status: 'success', data: updatedUser });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ status: 'error', message: 'Failed to update profile' });
  }
};

// DELETE profile (by token)
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
    const user = await db.users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    await user.destroy();
    res.json({ status: 'success', message: 'User profile deleted' });
  } catch (err) {
    console.error('Delete profile error:', err);
    res.status(500).json({ status: 'error', message: 'Failed to delete profile' });
  }
};