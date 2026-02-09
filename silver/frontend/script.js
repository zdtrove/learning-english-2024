// Configuration
const IS_GITHUB_PAGES = true; // true = read-only from JSON, false = use backend API
const API_BASE = 'http://localhost:5001/api';

// State
let currentPage = 1;
let totalPages = 1;
let jsonData = {
    transactions: [],
    averagePrice: { total_quantity: 0, total_cost: 0, avg_price: 0 }
};

// DOM Elements
const buyForm = document.getElementById('buy-form');
const sellForm = document.getElementById('sell-form');
const btnCalculate = document.getElementById('btn-calculate');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const transactionsBody = document.getElementById('transactions-body');
const tableLoading = document.getElementById('table-loading');
const tableEmpty = document.getElementById('table-empty');
const profitPreview = document.getElementById('profit-preview');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    if (IS_GITHUB_PAGES) {
        // Load JSON data first
        await loadJsonData();
        disableWriteOperations();
    }

    loadTransactions();
    loadStats();
    setDefaultDate();

    // Event listeners
    buyForm.addEventListener('submit', handleBuy);
    sellForm.addEventListener('submit', handleSell);
    btnCalculate.addEventListener('click', handleCalculateProfit);
    btnPrev.addEventListener('click', () => changePage(-1));
    btnNext.addEventListener('click', () => changePage(1));
});

// Load JSON data for GitHub Pages mode
async function loadJsonData() {
    try {
        const [transactionsRes, avgPriceRes] = await Promise.all([
            fetch('transactions.json'),
            fetch('average_price.json')
        ]);

        jsonData.transactions = await transactionsRes.json();
        const avgPriceArr = await avgPriceRes.json();
        if (avgPriceArr.length > 0) {
            jsonData.averagePrice = avgPriceArr[0];
        }
        console.log('Đã tải dữ liệu từ file JSON (chế độ chỉ đọc)');
    } catch (error) {
        console.error('Lỗi khi tải file JSON:', error);
        showToast('Không thể tải dữ liệu từ file JSON!', 'error');
    }
}

// Disable write operations in GitHub Pages mode
function disableWriteOperations() {
    // Disable buy form
    const buyInputs = buyForm.querySelectorAll('input, button');
    buyInputs.forEach(el => el.disabled = true);

    // Disable sell form submit button
    const sellSubmitBtn = sellForm.querySelector('button[type="submit"]');
    if (sellSubmitBtn) {
        sellSubmitBtn.disabled = true;
        sellSubmitBtn.title = 'Chỉ đọc - không thể bán';
    }

    // Add read-only notice
    const buyCard = buyForm.closest('.card');
    const sellCard = sellForm.closest('.card');

    if (buyCard) {
        const notice = document.createElement('div');
        notice.className = 'readonly-notice';
        notice.innerHTML = '<small style="color: #f39c12;">Chỉ đọc - không thể thêm giao dịch</small>';
        buyCard.querySelector('.card-header')?.appendChild(notice);
    }

    if (sellCard) {
        const notice = document.createElement('div');
        notice.className = 'readonly-notice';
        notice.innerHTML = '<small style="color: #f39c12;">Chỉ đọc - chỉ có thể tính lãi/lỗ</small>';
        sellCard.querySelector('.card-header')?.appendChild(notice);
    }
}

// Set default date to today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('buy-date').value = today;
}

// Format number as currency
function formatCurrency(num) {
    if (num === null || num === undefined) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(num);
}

// Format number
function formatNumber(num, decimals = 2) {
    if (num === null || num === undefined) return '0';
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals
    }).format(num);
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Show message in form
function showMessage(elementId, message, type = 'success') {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = `message ${type} show`;
    setTimeout(() => {
        el.classList.remove('show');
    }, 5000);
}

// Load transactions with pagination
async function loadTransactions() {
    tableLoading.style.display = 'flex';
    tableEmpty.style.display = 'none';
    transactionsBody.innerHTML = '';

    if (IS_GITHUB_PAGES) {
        // Read from JSON
        tableLoading.style.display = 'none';

        const limit = 10;
        const offset = (currentPage - 1) * limit;

        // Sort by date DESC, id DESC
        const sorted = [...jsonData.transactions].sort((a, b) => {
            if (a.date !== b.date) return b.date.localeCompare(a.date);
            return b.id - a.id;
        });

        const totalRecords = sorted.length;
        const totalPagesCalc = Math.ceil(totalRecords / limit);
        const data = sorted.slice(offset, offset + limit);

        if (data.length > 0) {
            renderTransactions(data);
            updatePagination({
                currentPage: currentPage,
                totalPages: totalPagesCalc,
                totalRecords: totalRecords,
                limit: limit
            });
        } else {
            tableEmpty.style.display = 'flex';
            updatePagination({ currentPage: 1, totalPages: 1 });
        }
    } else {
        // Read from API
        try {
            const response = await fetch(`${API_BASE}/transactions?page=${currentPage}&limit=10`);
            const result = await response.json();

            tableLoading.style.display = 'none';

            if (result.success && result.data.length > 0) {
                renderTransactions(result.data);
                updatePagination(result.pagination);
            } else {
                tableEmpty.style.display = 'flex';
                updatePagination({ currentPage: 1, totalPages: 1 });
            }
        } catch (error) {
            tableLoading.style.display = 'none';
            tableEmpty.style.display = 'flex';
            showToast('Can not load data. Check backend!', 'error');
        }
    }
}

// Render transactions table
function renderTransactions(transactions) {
    transactionsBody.innerHTML = transactions.map(tx => {
        const isBuy = tx.type === 'buy';
        const badgeClass = isBuy ? 'badge-buy' : 'badge-sell';
        const badgeText = isBuy ? 'Mua' : 'Bán';

        let profitLossHtml = '-';
        if (!isBuy && tx.profit_loss !== null) {
            const isProfit = tx.profit_loss >= 0;
            const profitClass = isProfit ? 'profit' : 'loss';
            const prefix = isProfit ? '+' : '';
            profitLossHtml = `<span class="${profitClass}">${prefix}${formatCurrency(tx.profit_loss)}</span>`;
        }

        return `
            <tr>
                <td>${tx.date}</td>
                <td>${formatNumber(tx.quantity)} lượng</td>
                <td>${formatCurrency(tx.price_per_unit)}</td>
                <td><span class="badge ${badgeClass}">${badgeText}</span></td>
                <td>${tx.avg_price_at_time ? formatCurrency(tx.avg_price_at_time) : '-'}</td>
                <td>${profitLossHtml}</td>
            </tr>
        `;
    }).join('');
}

// Update pagination controls
function updatePagination(pagination) {
    currentPage = pagination.currentPage;
    totalPages = pagination.totalPages || 1;

    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;

    btnPrev.disabled = currentPage <= 1;
    btnNext.disabled = currentPage >= totalPages;
}

// Change page
function changePage(delta) {
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        loadTransactions();
    }
}

// Load stats and summary
async function loadStats() {
    if (IS_GITHUB_PAGES) {
        // Read from JSON
        const data = jsonData.averagePrice;

        // Update header stats
        document.getElementById('stat-quantity').textContent = formatNumber(data.total_quantity) + ' lượng';
        document.getElementById('stat-avg-price').textContent = formatCurrency(data.avg_price);

        // Update summary box
        document.getElementById('summary-quantity').textContent = formatNumber(data.total_quantity) + ' lượng';
        document.getElementById('summary-avg-price').textContent = formatCurrency(data.avg_price) + '/lượng';
        document.getElementById('summary-total-value').textContent = formatCurrency(data.total_quantity * data.avg_price);

        // Calculate total profit/loss from transactions
        let totalProfitLoss = 0;
        jsonData.transactions.forEach(t => {
            if (t.type === 'sell' && t.profit_loss) {
                totalProfitLoss += t.profit_loss;
            }
        });

        const profitEl = document.getElementById('stat-profit');
        profitEl.textContent = (totalProfitLoss >= 0 ? '+' : '') + formatCurrency(totalProfitLoss);
        profitEl.className = 'stat-value ' + (totalProfitLoss >= 0 ? 'profit' : 'loss');
    } else {
        // Read from API
        try {
            const response = await fetch(`${API_BASE}/average-price`);
            const result = await response.json();

            if (result.success) {
                const data = result.data;

                // Update header stats
                document.getElementById('stat-quantity').textContent = formatNumber(data.total_quantity) + ' lượng';
                document.getElementById('stat-avg-price').textContent = formatCurrency(data.avg_price);

                // Update summary box
                document.getElementById('summary-quantity').textContent = formatNumber(data.total_quantity) + ' lượng';
                document.getElementById('summary-avg-price').textContent = formatCurrency(data.avg_price) + '/lượng';
                document.getElementById('summary-total-value').textContent = formatCurrency(data.total_quantity * data.avg_price);
            }

            // Load total profit/loss
            const statsResponse = await fetch(`${API_BASE}/stats`);
            const statsResult = await statsResponse.json();

            if (statsResult.success) {
                const totalProfitLoss = statsResult.data.total_profit_loss || 0;
                const profitEl = document.getElementById('stat-profit');
                profitEl.textContent = (totalProfitLoss >= 0 ? '+' : '') + formatCurrency(totalProfitLoss);
                profitEl.className = 'stat-value ' + (totalProfitLoss >= 0 ? 'profit' : 'loss');
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }
}

// Handle buy form submission
async function handleBuy(e) {
    e.preventDefault();

    if (IS_GITHUB_PAGES) {
        showMessage('buy-message', 'Che do chi doc. Khong the them giao dich.', 'error');
        return;
    }

    const date = document.getElementById('buy-date').value.trim();
    const quantity = document.getElementById('buy-quantity').value.trim();
    const price = document.getElementById('buy-price').value.trim();

    if (!date || !quantity || !price) {
        showMessage('buy-message', 'Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: date,
                quantity: parseFloat(quantity.replace(/,/g, '')),
                price_per_unit: parseFloat(price.replace(/,/g, ''))
            })
        });

        const result = await response.json();

        if (result.success) {
            showToast(`Đã mua ${formatNumber(result.data.quantity)} lượng bạc thành công!`, 'success');
            buyForm.reset();
            setDefaultDate();
            loadTransactions();
            loadStats();
        } else {
            showMessage('buy-message', result.error || 'Có lỗi xảy ra', 'error');
        }
    } catch (error) {
        showMessage('buy-message', 'Không thể kết nối server', 'error');
    }
}

// Handle calculate profit
async function handleCalculateProfit() {
    const quantity = document.getElementById('sell-quantity').value.trim();
    const price = document.getElementById('sell-price').value.trim();

    if (!quantity || !price) {
        showMessage('sell-message', 'Vui lòng nhập số lượng và giá bán', 'error');
        return;
    }

    const qty = parseFloat(quantity.replace(/,/g, ''));
    const currentPrice = parseFloat(price.replace(/,/g, ''));

    if (IS_GITHUB_PAGES) {
        // Calculate locally from JSON data
        const currentTotalQty = jsonData.averagePrice.total_quantity || 0;
        const avgPrice = jsonData.averagePrice.avg_price || 0;

        if (qty > currentTotalQty) {
            showMessage('sell-message', `Không đủ bạc để bán. Hiện có: ${currentTotalQty} lượng`, 'error');
            profitPreview.style.display = 'none';
            return;
        }

        if (avgPrice === 0) {
            showMessage('sell-message', 'Chưa có giao dịch mua nào', 'error');
            profitPreview.style.display = 'none';
            return;
        }

        const profitPerUnit = currentPrice - avgPrice;
        const totalProfit = profitPerUnit * qty;
        const profitPercentage = (profitPerUnit / avgPrice) * 100;
        const isProfit = profitPerUnit >= 0;

        // Show profit preview
        profitPreview.style.display = 'block';

        document.getElementById('preview-quantity').textContent = formatNumber(qty) + ' lượng';
        document.getElementById('preview-sell-price').textContent = formatCurrency(currentPrice) + '/lượng';
        document.getElementById('preview-avg-price').textContent = formatCurrency(avgPrice) + '/lượng';

        const profitPerUnitEl = document.getElementById('preview-profit-per-unit');
        profitPerUnitEl.textContent = (profitPerUnit >= 0 ? '+' : '') + formatCurrency(profitPerUnit);
        profitPerUnitEl.className = 'profit-value ' + (isProfit ? 'profit' : 'loss');

        const totalProfitEl = document.getElementById('preview-total-profit');
        totalProfitEl.textContent = (totalProfit >= 0 ? '+' : '') + formatCurrency(totalProfit);
        totalProfitEl.className = 'profit-value ' + (isProfit ? 'profit' : 'loss');

        const percentageEl = document.getElementById('preview-percentage');
        percentageEl.textContent = (profitPercentage >= 0 ? '+' : '') + formatNumber(profitPercentage) + '%';
        percentageEl.className = 'profit-value ' + (isProfit ? 'profit' : 'loss');
    } else {
        // Call API
        try {
            const response = await fetch(`${API_BASE}/calculate-profit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quantity: qty,
                    current_price: currentPrice
                })
            });

            const result = await response.json();

            if (result.success) {
                const data = result.data;

                // Show profit preview
                profitPreview.style.display = 'block';

                document.getElementById('preview-quantity').textContent = formatNumber(data.quantity) + ' lượng';
                document.getElementById('preview-sell-price').textContent = formatCurrency(data.current_price) + '/lượng';
                document.getElementById('preview-avg-price').textContent = formatCurrency(data.avg_price) + '/lượng';

                const profitPerUnit = document.getElementById('preview-profit-per-unit');
                profitPerUnit.textContent = (data.profit_per_unit >= 0 ? '+' : '') + formatCurrency(data.profit_per_unit);
                profitPerUnit.className = 'profit-value ' + (data.is_profit ? 'profit' : 'loss');

                const totalProfit = document.getElementById('preview-total-profit');
                totalProfit.textContent = (data.total_profit >= 0 ? '+' : '') + formatCurrency(data.total_profit);
                totalProfit.className = 'profit-value ' + (data.is_profit ? 'profit' : 'loss');

                const percentage = document.getElementById('preview-percentage');
                percentage.textContent = (data.profit_percentage >= 0 ? '+' : '') + formatNumber(data.profit_percentage) + '%';
                percentage.className = 'profit-value ' + (data.is_profit ? 'profit' : 'loss');
            } else {
                showMessage('sell-message', result.error || 'Có lỗi xảy ra', 'error');
                profitPreview.style.display = 'none';
            }
        } catch (error) {
            showMessage('sell-message', 'Không thể kết nối server', 'error');
        }
    }
}

// Handle sell form submission
async function handleSell(e) {
    e.preventDefault();

    if (IS_GITHUB_PAGES) {
        showMessage('sell-message', 'Chế độ chỉ đọc. Không thể bán.', 'error');
        return;
    }

    const quantity = document.getElementById('sell-quantity').value.trim();
    const price = document.getElementById('sell-price').value.trim();

    if (!quantity || !price) {
        showMessage('sell-message', 'Vui lòng nhập số lượng và giá bán', 'error');
        return;
    }

    const today = new Date().toISOString().split('T')[0];

    try {
        const response = await fetch(`${API_BASE}/sell`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: today,
                quantity: parseFloat(quantity.replace(/,/g, '')),
                price_per_unit: parseFloat(price.replace(/,/g, ''))
            })
        });

        const result = await response.json();

        if (result.success) {
            const profitLoss = result.data.profit_loss;
            const profitText = profitLoss >= 0 ? 'loi' : 'lo';
            showToast(`Da ban ${formatNumber(result.data.quantity)} lượng, ${profitText} ${formatCurrency(Math.abs(profitLoss))}!`, 'success');
            sellForm.reset();
            profitPreview.style.display = 'none';
            loadTransactions();
            loadStats();
        } else {
            showMessage('sell-message', result.error || 'Có lỗi xảy ra', 'error');
        }
    } catch (error) {
        showMessage('sell-message', 'Không thể kết nối server', 'error');
    }
}

// winget install SQLite.SQLite
// sqlite3 silver.db ".mode json" ".output transactions.json" "select * from transactions;"
// sqlite3 silver.db ".mode json" ".output average_price.json" "select * from average_price;"
