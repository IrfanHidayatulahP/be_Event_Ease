const db = require('../../config/db');

// CREATE ticket category
exports.createTicketCategory = async (req, res) => {
    try {
        const { event_id, nama, harga, kuota_total, kuota_tersedia } = req.body;
        if (!event_id || !nama || harga == null || kuota_total == null || kuota_tersedia == null) {
            return res.status(400).json({ status: 'fail', message: 'event_id, nama, harga, kuota_total, dan kuota_tersedia wajib diisi' });
        }
        const ticket = await db.ticket_categories.create({
            event_id,
            nama,
            harga,
            kuota_total,
            kuota_tersedia
        });
        res.status(201).json({ status: 'success', data: ticket });
    } catch (err) {
        console.error('Create ticket category error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to create ticket category' });
    }
};

// READ all ticket categories for an event
exports.getAllTicketCategories = async (req, res) => {
    try {
        const { event_id } = req.params;
        const tickets = await db.ticket_categories.findAll({
            where: { event_id },
            attributes: ['id', 'event_id', 'nama', 'harga', 'kuota_total', 'kuota_tersedia']
        });
        res.json({ status: 'success', data: tickets });
    } catch (err) {
        console.error('Get ticket categories error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch ticket categories' });
    }
};

// READ single ticket category by id
exports.getTicketCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await db.ticket_categories.findOne({
            where: { id },
            attributes: ['id', 'event_id', 'nama', 'harga', 'kuota_total', 'kuota_tersedia']
        });
        if (!ticket) {
            return res.status(404).json({ status: 'fail', message: 'Ticket category not found' });
        }
        res.json({ status: 'success', data: ticket });
    } catch (err) {
        console.error('Get ticket category by id error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch ticket category' });
    }
};

// UPDATE ticket category
exports.updateTicketCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, harga, kuota_total, kuota_tersedia } = req.body;
        const ticket = await db.ticket_categories.findOne({ where: { id } });
        if (!ticket) {
            return res.status(404).json({ status: 'fail', message: 'Ticket category not found' });
        }
        ticket.nama = nama !== undefined ? nama : ticket.nama;
        ticket.harga = harga !== undefined ? harga : ticket.harga;
        ticket.kuota_total = kuota_total !== undefined ? kuota_total : ticket.kuota_total;
        ticket.kuota_tersedia = kuota_tersedia !== undefined ? kuota_tersedia : ticket.kuota_tersedia;
        await ticket.save();
        res.json({ status: 'success', data: ticket });
    } catch (err) {
        console.error('Update ticket category error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to update ticket category' });
    }
};

// DELETE ticket category
exports.deleteTicketCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await db.ticket_categories.findOne({ where: { id } });
        if (!ticket) {
            return res.status(404).json({ status: 'fail', message: 'Ticket category not found' });
        }
        await ticket.destroy();
        res.json({ status: 'success', message: 'Ticket category deleted' });
    } catch (err) {
        console.error('Delete ticket category error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to delete ticket category' });
    }
};