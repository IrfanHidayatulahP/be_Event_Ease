const db = require('../../config/db');

// CREATE order
exports.createOrder = async (req, res) => {
    try {
        const { user_id, tiket_kategori_id, status, jumlah_tiket, total_harga, tanggal_pemesanan } = req.body;
        if (!user_id || !tiket_kategori_id || jumlah_tiket == null || total_harga == null || !tanggal_pemesanan) {
            return res.status(400).json({ status: 'fail', message: 'user_id, tiket_kategori_id, jumlah_tiket, total_harga, dan tanggal_pemesanan wajib diisi' });
        }
        const order = await db.orders.create({
            user_id,
            tiket_kategori_id,
            status: status || 'pending',
            jumlah_tiket,
            total_harga,
            tanggal_pemesanan
        });
        res.status(201).json({ status: 'success', data: order });
    } catch (err) {
        console.error('Create order error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to create order' });
    }
};

// READ all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await db.orders.findAll({
            attributes: [
                'id', 'user_id', 'tiket_kategori_id', 'status', 'jumlah_tiket',
                'total_harga', 'tanggal_pemesanan', 'createdAt', 'updatedAt'
            ]
        });
        res.json({ status: 'success', data: orders });
    } catch (err) {
        console.error('Get orders error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch orders' });
    }
};

// READ single order by id
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await db.orders.findOne({
            where: { id },
            attributes: [
                'id', 'user_id', 'tiket_kategori_id', 'status', 'jumlah_tiket',
                'total_harga', 'tanggal_pemesanan', 'createdAt', 'updatedAt'
            ]
        });
        if (!order) {
            return res.status(404).json({ status: 'fail', message: 'Order not found' });
        }
        res.json({ status: 'success', data: order });
    } catch (err) {
        console.error('Get order by id error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch order' });
    }
};

// UPDATE order
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, jumlah_tiket, total_harga, tanggal_pemesanan } = req.body;
        const order = await db.orders.findOne({ where: { id } });
        if (!order) {
            return res.status(404).json({ status: 'fail', message: 'Order not found' });
        }
        order.status = status !== undefined ? status : order.status;
        order.jumlah_tiket = jumlah_tiket !== undefined ? jumlah_tiket : order.jumlah_tiket;
        order.total_harga = total_harga !== undefined ? total_harga : order.total_harga;
        order.tanggal_pemesanan = tanggal_pemesanan !== undefined ? tanggal_pemesanan : order.tanggal_pemesanan;
        await order.save();
        res.json({ status: 'success', data: order });
    } catch (err) {
        console.error('Update order error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to update order' });
    }
};

// DELETE order
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await db.orders.findOne({ where: { id } });
        if (!order) {
            return res.status(404).json({ status: 'fail', message: 'Order not found' });
        }
        await order.destroy();
        res.json({ status: 'success', message: 'Order deleted' });
    } catch (err) {
        console.error('Delete order error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to delete order' });
    }
};