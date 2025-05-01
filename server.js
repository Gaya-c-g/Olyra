// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Simulated in-memory orders database\let orders = {
  '1001': { id: '1001', customer: 'أمل محمد', products: ['منتج 1', 'منتج 3'], total: 70, date: '2025-04-28', status: 'pending' },
  '1002': { id: '1002', customer: 'خالد علي', products: ['منتج 2'], total: 50, date: '2025-04-29', status: 'processed' },
  '1003': { id: '1003', customer: 'سارة يوسف', products: ['منتج 1'], total: 30, date: '2025-04-30', status: 'shipped' }
};

// Utility to get label for status
const statusLabels = {
  pending: 'قيد الانتظار',
  processed: 'تم المعالجة',
  shipped: 'شحن',
  cancelled: 'ملغى'
};

// Endpoint to update order status
app.put('/api/orders/:id/status', (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  // Validate order exists
  if (!orders[id]) {
    return res.status(404).json({ error: 'الطلب غير موجود' });
  }

  // Validate status
  if (!statusLabels[newStatus]) {
    return res.status(400).json({ error: 'حالة غير صالحة' });
  }

  // Update status
  orders[id].status = newStatus;

  // Respond with updated info
  res.json({
    orderId: id,
    status: newStatus,
    statusLabel: statusLabels[newStatus]
  });
});

// Endpoint to get all orders (for admin dashboard)
app.get('/api/orders', (req, res) => {
  const allOrders = Object.values(orders).map(o => ({
    id: o.id,
    customer: o.customer,
    products: o.products.join(', '),
    total: o.total,
    date: o.date,
    status: o.status,
    statusLabel: statusLabels[o.status]
  }));
  res.json(allOrders);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
