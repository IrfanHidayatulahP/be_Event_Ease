const db = require('../../config/db');

// CREATE event
exports.createEvent = async (req, res) => {
    try {
        const eoId = req.user && req.user.id;
        const { nama, deskripsi, start_date, end_date, lokasi } = req.body;
        if (!eoId || !nama) {
            return res.status(400).json({ status: 'fail', message: 'eo_id dan nama wajib diisi' });
        }
        const event = await db.events.create({
            eo_id: eoId,
            nama,
            deskripsi,
            start_date,
            end_date,
            lokasi
        });
        const createdEvent = await db.events.findOne({
            where: { id: event.id },
            attributes: ['id', 'eo_id', 'nama', 'deskripsi', 'start_date', 'end_date', 'lokasi', 'createdAt', 'updatedAt']
        });
        res.status(201).json({ status: 'success', data: createdEvent });
    } catch (err) {
        console.error('Create event error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to create event' });
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

// READ single event by id
exports.getEventById = async (req, res) => {
    try {
        const eoId = req.user && req.user.id;
        const { id } = req.params;
        const event = await db.events.findOne({
            where: { id, eo_id: eoId },
            attributes: ['id', 'eo_id', 'nama', 'deskripsi', 'start_date', 'end_date', 'lokasi', 'createdAt', 'updatedAt'
            ]
        });
        if (!event) {
            return res.status(404).json({ status: 'fail', message: 'Event not found' });
        }
        res.json({ status: 'success', data: event });
    } catch (err) {
        console.error('Get event by id error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch event' });
    }
};

// UPDATE event
exports.updateEvent = async (req, res) => {
    try {
        const eoId = req.user && req.user.id;
        const { id } = req.params;
        const { nama, deskripsi, start_date, end_date, lokasi } = req.body;
        const event = await db.events.findOne({ where: { id, eo_id: eoId } });
        if (!event) {
            return res.status(404).json({ status: 'fail', message: 'Event not found' });
        }
        event.nama = nama !== undefined ? nama : event.nama;
        event.deskripsi = deskripsi !== undefined ? deskripsi : event.deskripsi;
        event.start_date = start_date !== undefined ? start_date : event.start_date;
        event.end_date = end_date !== undefined ? end_date : event.end_date;
        event.lokasi = lokasi !== undefined ? lokasi : event.lokasi;
        await event.save();
        const updatedEvent = await db.events.findOne({
            where: { id: event.id },
            attributes: ['id', 'eo_id', 'nama', 'deskripsi', 'start_date', 'end_date', 'lokasi', 'createdAt', 'updatedAt']
        });
        res.json({ status: 'success', data: updatedEvent });
    } catch (err) {
        console.error('Update event error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to update event' });
    }
};

// DELETE event
exports.deleteEvent = async (req, res) => {
    try {
        const eoId = req.user && req.user.id;
        const { id } = req.params;
        const event = await db.events.findOne({ where: { id, eo_id: eoId } });
        if (!event) {
            return res.status(404).json({ status: 'fail', message: 'Event not found' });
        }
        await event.destroy();
        res.json({ status: 'success', message: 'Event deleted' });
    } catch (err) {
        console.error('Delete event error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to delete event' });
    }
};