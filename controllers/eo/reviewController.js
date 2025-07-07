const db = require('../../config/db');

// CREATE review untuk event tertentu
exports.createReview = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { event_id, rating, komentar } = req.body;

    if (!userId || !event_id || !rating) {
      return res.status(400).json({ status: 'fail', message: 'event_id dan rating wajib diisi' });
    }

    const event = await db.events.findOne({ where: { id: event_id } });
    if (!event) {
      return res.status(404).json({ status: 'fail', message: 'Event tidak ditemukan' });
    }

    const review = await db.reviews.create({
      user_id: userId,
      event_id,
      rating,
      komentar
    });

    res.status(201).json({ status: 'success', data: review });
  } catch (err) {
    console.error('Create review error:', err);
    res.status(500).json({ status: 'error', message: 'Gagal membuat review' });
  }
};

// READ semua review untuk event tertentu
exports.getReviewsByEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const reviews = await db.reviews.findAll({
      where: { event_id },
      attributes: ['id', 'user_id', 'event_id', 'rating', 'komentar', 'createdAt', 'updatedAt']
    });
    res.json({ status: 'success', data: reviews });
  } catch (err) {
    console.error('Get reviews error:', err);
    res.status(500).json({ status: 'error', message: 'Gagal mengambil review' });
  }
};

// READ single review by id
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await db.reviews.findOne({
      where: { id },
      attributes: ['id', 'user_id', 'event_id', 'rating', 'komentar', 'createdAt', 'updatedAt']
    });
    if (!review) {
      return res.status(404).json({ status: 'fail', message: 'Review tidak ditemukan' });
    }
    res.json({ status: 'success', data: review });
  } catch (err) {
    console.error('Get review by id error:', err);
    res.status(500).json({ status: 'error', message: 'Gagal mengambil review' });
  }
};

// UPDATE review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, komentar } = req.body;
    const review = await db.reviews.findOne({ where: { id } });
    if (!review) {
      return res.status(404).json({ status: 'fail', message: 'Review tidak ditemukan' });
    }
    review.rating = rating !== undefined ? rating : review.rating;
    review.komentar = komentar !== undefined ? komentar : review.komentar;
    await review.save();
    res.json({ status: 'success', data: review });
  } catch (err) {
    console.error('Update review error:', err);
    res.status(500).json({ status: 'error', message: 'Gagal mengupdate review' });
  }
};

// DELETE review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await db.reviews.findOne({ where: { id } });
    if (!review) {
      return res.status(404).json({ status: 'fail', message: 'Review tidak ditemukan' });
    }
    await review.destroy();
    res.json({ status: 'success', message: 'Review berhasil dihapus' });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ status: 'error', message: 'Gagal menghapus review' });
  }
};