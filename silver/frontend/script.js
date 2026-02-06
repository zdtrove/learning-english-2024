// API Base URL
const API_BASE = 'http://localhost:3000/api';

// State
let currentPage = 1;
let totalPages = 1;

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
document.addEventListener('DOMContentLoaded', () => {
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
        showToast('Không thể tải dữ liệu. Kiểm tra backend!', 'error');
    }
}

// Render transactions table
function renderTransactions(transactions) {
    transactionsBody.innerHTML = transactions.map(tx => {
        const isBuy = tx.type === 'buy';
        const badgeClass = isBuy ? 'badge-buy' : 'badge-sell';
        const badgeText = isBuy ? '📥 Mua' : '📤 Bán';
        
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

// Handle buy form submission
async function handleBuy(e) {
    e.preventDefault();
    
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

    try {
        const response = await fetch(`${API_BASE}/calculate-profit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quantity: parseFloat(quantity.replace(/,/g, '')),
                current_price: parseFloat(price.replace(/,/g, ''))
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

// Handle sell form submission
async function handleSell(e) {
    e.preventDefault();
    
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
            const profitText = profitLoss >= 0 ? 'lời' : 'lỗ';
            showToast(`Đã bán ${formatNumber(result.data.quantity)} lượng, ${profitText} ${formatCurrency(Math.abs(profitLoss))}!`, 'success');
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
