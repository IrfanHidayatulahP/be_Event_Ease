const db = require('../../config/db');

// CREATE virtual ticket
exports.createVirtualTicket = async (req, res) => {
    try {
        const { order_id, kode, status, tanggal } = req.body;
        if (!order_id || !kode || !tanggal) {
            return res.status(400).json({ status: 'fail', message: 'order_id, kode, dan tanggal wajib diisi' });
        }
        const virtualTicket = await db.virtual_tickets.create({
            order_id,
            kode,
            status: status || 'unused',
            tanggal
        });
        res.status(201).json({ status: 'success', data: virtualTicket });
    } catch (err) {
        console.error('Create virtual ticket error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to create virtual ticket' });
    }
};

// READ all virtual tickets by event (via order)
exports.getVirtualTicketsByEvent = async (req, res) => {
    try {
        const { event_id } = req.params;
        const virtualTickets = await db.virtual_tickets.findAll({
            include: [
                {
                    model: db.orders,
                    as: 'order',
                    where: { event_id },
                    attributes: ['id', 'user_id', 'event_id', 'status']
                }
            ],
            attributes: ['id', 'order_id', 'kode', 'status', 'tanggal']
        });
        res.json({ status: 'success', data: virtualTickets });
    } catch (err) {
        console.error('Get virtual tickets by event error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch virtual tickets' });
    }
};

// READ single virtual ticket by id
exports.getVirtualTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const virtualTicket = await db.virtual_tickets.findOne({
            where: { id },
            attributes: ['id', 'order_id', 'kode', 'status', 'tanggal']
        });
        if (!virtualTicket) {
            return res.status(404).json({ status: 'fail', message: 'Virtual ticket not found' });
        }
        res.json({ status: 'success', data: virtualTicket });
    } catch (err) {
        console.error('Get virtual ticket by id error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch virtual ticket' });
    }
};

// UPDATE virtual ticket
exports.updateVirtualTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { kode, status, tanggal } = req.body;
        const virtualTicket = await db.virtual_tickets.findOne({ where: { id } });
        if (!virtualTicket) {
            return res.status(404).json({ status: 'fail', message: 'Virtual ticket not found' });
        }
        virtualTicket.kode = kode !== undefined ? kode : virtualTicket.kode;
        virtualTicket.status = status !== undefined ? status : virtualTicket.status;
        virtualTicket.tanggal = tanggal !== undefined ? tanggal : virtualTicket.tanggal;
        await virtualTicket.save();
        res.json({ status: 'success', data: virtualTicket });
    } catch (err) {
        console.error('Update virtual ticket error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to update virtual ticket' });
    }
};

// DELETE virtual ticket
exports.deleteVirtualTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const virtualTicket = await db.virtual_tickets.findOne({ where: { id } });
        if (!virtualTicket) {
            return res.status(404).json({ status: 'fail', message: 'Virtual ticket not found' });
        }
        await virtualTicket.destroy();
        res.json({ status: 'success', message: 'Virtual ticket deleted' });
    } catch (err) {
        console.error('Delete virtual ticket error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to delete virtual ticket' });
    }
};