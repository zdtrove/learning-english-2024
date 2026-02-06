const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'silver.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
    // Bảng giao dịch mua/bán
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            quantity REAL NOT NULL,
            price_per_unit REAL NOT NULL,
            type TEXT NOT NULL CHECK(type IN ('buy', 'sell')),
            avg_price_at_time REAL,
            profit_loss REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Bảng lưu giá trung bình (weighted average cost - WAC)
    db.run(`
        CREATE TABLE IF NOT EXISTS average_price (
            id INTEGER PRIMARY KEY CHECK(id = 1),
            total_quantity REAL DEFAULT 0,
            total_cost REAL DEFAULT 0,
            avg_price REAL DEFAULT 0
        )
    `);

    // Khởi tạo record giá trung bình nếu chưa có
    db.run(`
        INSERT OR IGNORE INTO average_price (id, total_quantity, total_cost, avg_price)
        VALUES (1, 0, 0, 0)
    `);
});

// ============== API ENDPOINTS ==============

// 1. Lấy danh sách giao dịch với phân trang
app.get('/api/transactions', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Đếm tổng số record
    db.get('SELECT COUNT(*) as total FROM transactions', [], (err, countResult) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const totalRecords = countResult.total;
        const totalPages = Math.ceil(totalRecords / limit);

        // Lấy danh sách giao dịch
        db.all(
            `SELECT * FROM transactions ORDER BY date DESC, id DESC LIMIT ? OFFSET ?`,
            [limit, offset],
            (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    success: true,
                    data: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        totalRecords: totalRecords,
                        limit: limit
                    }
                });
            }
        );
    });
});

// 2. Lấy giá trung bình hiện tại và tổng lượng bạc còn lại
app.get('/api/average-price', (req, res) => {
    db.get('SELECT * FROM average_price WHERE id = 1', [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            success: true,
            data: {
                total_quantity: row.total_quantity || 0,
                total_cost: row.total_cost || 0,
                avg_price: row.avg_price || 0
            }
        });
    });
});

// 3. Thêm giao dịch MUA bạc
app.post('/api/buy', (req, res) => {
    const { date, quantity, price_per_unit } = req.body;

    // Validate input
    if (!date || !quantity || !price_per_unit) {
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng nhập đầy đủ ngày, số lượng và giá' 
        });
    }

    const qty = parseFloat(quantity);
    const price = parseFloat(price_per_unit);

    if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Số lượng phải là số dương' 
        });
    }

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Giá phải là số dương' 
        });
    }

    // Tính giá trung bình mới (Weighted Average Cost method)
    db.get('SELECT * FROM average_price WHERE id = 1', [], (err, avgRow) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const currentTotalQty = avgRow.total_quantity || 0;
        const currentTotalCost = avgRow.total_cost || 0;

        const newTotalQty = currentTotalQty + qty;
        const newTotalCost = currentTotalCost + (qty * price);
        const newAvgPrice = newTotalQty > 0 ? newTotalCost / newTotalQty : 0;

        // Bắt đầu transaction
        db.serialize(() => {
            // Thêm giao dịch mua
            db.run(
                `INSERT INTO transactions (date, quantity, price_per_unit, type, avg_price_at_time)
                 VALUES (?, ?, ?, 'buy', ?)`,
                [date, qty, price, newAvgPrice],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    const transactionId = this.lastID;

                    // Cập nhật giá trung bình
                    db.run(
                        `UPDATE average_price 
                         SET total_quantity = ?, total_cost = ?, avg_price = ?
                         WHERE id = 1`,
                        [newTotalQty, newTotalCost, newAvgPrice],
                        (err) => {
                            if (err) {
                                return res.status(500).json({ error: err.message });
                            }

                            res.json({
                                success: true,
                                message: 'Đã thêm giao dịch mua thành công',
                                data: {
                                    id: transactionId,
                                    date: date,
                                    quantity: qty,
                                    price_per_unit: price,
                                    type: 'buy',
                                    new_avg_price: newAvgPrice,
                                    new_total_quantity: newTotalQty
                                }
                            });
                        }
                    );
                }
            );
        });
    });
});

// 4. Tính lời/lỗ nếu bán với giá hiện tại
app.post('/api/calculate-profit', (req, res) => {
    const { quantity, current_price } = req.body;

    if (!quantity || !current_price) {
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng nhập đầy đủ số lượng và giá hiện tại' 
        });
    }

    const qty = parseFloat(quantity);
    const price = parseFloat(current_price);

    if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Số lượng phải là số dương' 
        });
    }

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Giá phải là số dương' 
        });
    }

    db.get('SELECT * FROM average_price WHERE id = 1', [], (err, avgRow) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const currentTotalQty = avgRow.total_quantity || 0;
        const avgPrice = avgRow.avg_price || 0;

        if (qty > currentTotalQty) {
            return res.status(400).json({ 
                success: false, 
                error: `Không đủ bạc để bán. Hiện có: ${currentTotalQty} lượng` 
            });
        }

        if (avgPrice === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Chưa có giao dịch mua nào' 
            });
        }

        const profitPerUnit = price - avgPrice;
        const totalProfit = profitPerUnit * qty;
        const profitPercentage = (profitPerUnit / avgPrice) * 100;

        res.json({
            success: true,
            data: {
                quantity: qty,
                current_price: price,
                avg_price: avgPrice,
                profit_per_unit: profitPerUnit,
                total_profit: totalProfit,
                profit_percentage: profitPercentage,
                is_profit: profitPerUnit >= 0
            }
        });
    });
});

// 5. Thực hiện giao dịch BÁN bạc
app.post('/api/sell', (req, res) => {
    const { date, quantity, price_per_unit } = req.body;

    // Validate input
    if (!quantity || !price_per_unit) {
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng nhập đầy đủ số lượng và giá bán' 
        });
    }

    const qty = parseFloat(quantity);
    const price = parseFloat(price_per_unit);
    const sellDate = date || new Date().toISOString().split('T')[0];

    if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Số lượng phải là số dương' 
        });
    }

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Giá phải là số dương' 
        });
    }

    db.get('SELECT * FROM average_price WHERE id = 1', [], (err, avgRow) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const currentTotalQty = avgRow.total_quantity || 0;
        const currentTotalCost = avgRow.total_cost || 0;
        const avgPrice = avgRow.avg_price || 0;

        if (qty > currentTotalQty) {
            return res.status(400).json({ 
                success: false, 
                error: `Không đủ bạc để bán. Hiện có: ${currentTotalQty} lượng` 
            });
        }

        if (avgPrice === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Chưa có giao dịch mua nào' 
            });
        }

        // Tính lời/lỗ
        const profitLoss = (price - avgPrice) * qty;

        // Cập nhật số lượng và tổng chi phí (giữ nguyên giá trung bình theo WAC)
        const newTotalQty = currentTotalQty - qty;
        // Giảm tổng chi phí tương ứng với giá trung bình hiện tại
        const newTotalCost = newTotalQty * avgPrice;
        // Giá trung bình không đổi khi bán (theo logic tài chính WAC)
        const newAvgPrice = newTotalQty > 0 ? avgPrice : 0;

        db.serialize(() => {
            // Thêm giao dịch bán
            db.run(
                `INSERT INTO transactions (date, quantity, price_per_unit, type, avg_price_at_time, profit_loss)
                 VALUES (?, ?, ?, 'sell', ?, ?)`,
                [sellDate, qty, price, avgPrice, profitLoss],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    const transactionId = this.lastID;

                    // Cập nhật giá trung bình
                    db.run(
                        `UPDATE average_price 
                         SET total_quantity = ?, total_cost = ?, avg_price = ?
                         WHERE id = 1`,
                        [newTotalQty, newTotalCost, newAvgPrice],
                        (err) => {
                            if (err) {
                                return res.status(500).json({ error: err.message });
                            }

                            res.json({
                                success: true,
                                message: 'Đã thêm giao dịch bán thành công',
                                data: {
                                    id: transactionId,
                                    date: sellDate,
                                    quantity: qty,
                                    sell_price: price,
                                    avg_price_at_time: avgPrice,
                                    profit_loss: profitLoss,
                                    type: 'sell',
                                    remaining_quantity: newTotalQty
                                }
                            });
                        }
                    );
                }
            );
        });
    });
});

// 6. Lấy thống kê tổng quan
app.get('/api/stats', (req, res) => {
    db.get('SELECT * FROM average_price WHERE id = 1', [], (err, avgRow) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.get(
            `SELECT 
                SUM(CASE WHEN type = 'buy' THEN quantity ELSE 0 END) as total_bought,
                SUM(CASE WHEN type = 'sell' THEN quantity ELSE 0 END) as total_sold,
                SUM(CASE WHEN type = 'sell' THEN profit_loss ELSE 0 END) as total_profit_loss,
                COUNT(*) as total_transactions
             FROM transactions`,
            [],
            (err, statsRow) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    success: true,
                    data: {
                        current_quantity: avgRow.total_quantity || 0,
                        average_price: avgRow.avg_price || 0,
                        total_cost: avgRow.total_cost || 0,
                        total_bought: statsRow.total_bought || 0,
                        total_sold: statsRow.total_sold || 0,
                        total_profit_loss: statsRow.total_profit_loss || 0,
                        total_transactions: statsRow.total_transactions || 0
                    }
                });
            }
        );
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET  /api/transactions     - Danh sách giao dịch (có phân trang)`);
    console.log(`   GET  /api/average-price    - Giá trung bình hiện tại`);
    console.log(`   GET  /api/stats            - Thống kê tổng quan`);
    console.log(`   POST /api/buy              - Mua bạc`);
    console.log(`   POST /api/sell             - Bán bạc`);
    console.log(`   POST /api/calculate-profit - Tính lời/lỗ`);
});