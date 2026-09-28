// Global Fiyat Nesnesi (Canlı Verilerle Güncellenir)
let marketData = {
    USD: { buy: 36.45, sell: 36.52, change: 0.12, high: 36.60, low: 36.38 },
    EUR: { buy: 39.50, sell: 39.60, change: -0.08, high: 39.75, low: 39.42 },
    GBP: { buy: 46.80, sell: 46.95, change: 0.25, high: 47.10, low: 46.65 },
    GAU: { buy: 3120, sell: 3135, change: 0.45, high: 3150, low: 3105 },
    CEY: { buy: 5100, sell: 5180, change: 0.40, high: 5200, low: 5080 },
    BTC: { buy: 3250000, sell: 3265000, change: 1.85, high: 3300000, low: 3180000 }
};

// Sayfa Yüklendiğinde
document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initTradingViewChart("FX:USDTRY");
    fetchRealMarketData();
    
    // Her 3 saniyede bir fiyat simülasyonu / canlı güncelleme yap
    setInterval(updatePricesLive, 3000);
    calculateConversion();
});

// Canlı Saat
function initClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('live-clock').innerText = now.toLocaleTimeString('tr-TR');
    }, 1000);
}

// Gerçek/Anlık Veri Çekme (API Entegrasyonu)
async function fetchRealMarketData() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        if(data && data.rates && data.rates.TRY) {
            const usdTry = data.rates.TRY;
            marketData.USD.buy = (usdTry * 0.999).toFixed(2);
            marketData.USD.sell = (usdTry * 1.001).toFixed(2);
            
            if(data.rates.EUR) {
                const eurTry = usdTry / data.rates.EUR;
                marketData.EUR.buy = (eurTry * 0.999).toFixed(2);
                marketData.EUR.sell = (eurTry * 1.001).toFixed(2);
            }
            renderMarketCards();
            renderMarketTable();
            updateTicker();
            calculateConversion();
        }
    } catch(e) {
        console.log("API bağlantısı simüle moda geçiyor... - script.js:51");
        renderMarketCards();
        renderMarketTable();
        updateTicker();
    }
}

// Canlı Fiyat Değişim Simülatörü
function updatePricesLive() {
    Object.keys(marketData).forEach(key => {
        const delta = (Math.random() - 0.49) * (marketData[key].sell * 0.0015);
        marketData[key].buy = parseFloat((parseFloat(marketData[key].buy) + delta).toFixed(2));
        marketData[key].sell = parseFloat((parseFloat(marketData[key].sell) + delta).toFixed(2));
        marketData[key].change = parseFloat((marketData[key].change + (delta > 0 ? 0.02 : -0.02)).toFixed(2));
    });

    renderMarketCards();
    renderMarketTable();
    calculateConversion();
}

// Kartları Ekrana Basma
function renderMarketCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    const items = [
        { code: 'USD', name: 'Dolar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'Sterlin', symbol: '£' },
        { code: 'GAU', name: 'Gram Altın', symbol: '₺' },
        { code: 'CEY', name: 'Çeyrek Altın', symbol: '₺' },
        { code: 'BTC', name: 'Bitcoin', symbol: '$' }
    ];

    items.forEach(item => {
        const data = marketData[item.code];
        const isUp = data.change >= 0;
        const badgeClass = isUp ? 'badge-up' : 'badge-down';
        const icon = isUp ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';

        container.innerHTML += `
            <div class="market-card" onclick="switchAsset('${item.code}TRY')">
                <div class="card-top">
                    <span class="card-title">${item.name} (${item.code})</span>
                    <span class="card-badge ${badgeClass}">
                        <i class="fa-solid ${icon}"></i> %${data.change}
                    </span>
                </div>
                <div class="card-price">${data.sell} ₺</div>
                <div class="card-sub">
                    <span>Alış: ${data.buy}</span>
                    <span>Satış: ${data.sell}</span>
                </div>
            </div>
        `;
    });
}

// Tablo Güncelleme
function renderMarketTable() {
    const tbody = document.getElementById('market-table-body');
    tbody.innerHTML = '';

    Object.keys(marketData).forEach(code => {
        const item = marketData[code];
        const isUp = item.change >= 0;
        const colorStyle = isUp ? 'color: var(--green-up)' : 'color: var(--red-down)';

        tbody.innerHTML += `
            <tr>
                <td><b>${code}/TRY</b></td>
                <td>${item.buy} ₺</td>
                <td>${item.sell} ₺</td>
                <td>${item.high} ₺</td>
                <td>${item.low} ₺</td>
                <td style="${colorStyle}; font-weight:600">%${item.change}</td>
            </tr>
        `;
    });
}

// Ticker Bandı
function updateTicker() {
    const ticker = document.getElementById('top-ticker');
    let html = '';
    Object.keys(marketData).forEach(code => {
        const item = marketData[code];
        html += `<div class="ticker-item"><b>${code}:</b> ${item.sell} ₺ (<span style="color:${item.change>=0?'#10b981':'#ef4444'}">%${item.change}</span>)</div>`;
    });
    ticker.innerHTML = html;
}

// TradingView Grafik Switch
function switchAsset(assetCode) {
    document.querySelectorAll('.btn-asset').forEach(btn => btn.classList.remove('active'));
    
    let tvSymbol = "FX:USDTRY";
    if(assetCode.includes('EUR')) tvSymbol = "FX:EURTRY";
    if(assetCode.includes('GAU')) tvSymbol = "OANDA:XAUUSD";
    if(assetCode.includes('BTC')) tvSymbol = "BINANCE:BTCUSDT";

    document.getElementById('selected-asset-title').innerText = `${assetCode} - Canlı Grafik`;
    initTradingViewChart(tvSymbol);
}

function initTradingViewChart(symbol) {
    document.getElementById('tradingview_chart').innerHTML = '';
    new TradingView.widget({
        "width": "100%",
        "height": "100%",
        "symbol": symbol,
        "interval": "D",
        "timezone": "Europe/Istanbul",
        "theme": "dark",
        "style": "1",
        "locale": "tr",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "container_id": "tradingview_chart"
    });
}

// SABİT HESAP MAKİNESİ SEKMELERİ
function switchCalcTab(tabName) {
    document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    if(tabName === 'convert') {
        document.querySelectorAll('.calc-tab')[0].classList.add('active');
        document.getElementById('tab-convert').classList.add('active');
    } else {
        document.querySelectorAll('.calc-tab')[1].classList.add('active');
        document.getElementById('tab-classic').classList.add('active');
    }
}

// HIZLI DÖVİZ ÇEVİRİCİ MANTIĞI
function calculateConversion() {
    const amount = parseFloat(document.getElementById('convert-amount').value) || 0;
    const from = document.getElementById('convert-from').value;
    const to = document.getElementById('convert-to').value;

    function getTryValue(code) {
        if(code === 'TRY') return 1;
        if(marketData[code]) return marketData[code].sell;
        return 1;
    }

    const fromInTry = amount * getTryValue(from);
    const result = fromInTry / getTryValue(to);

    document.getElementById('convert-result').innerText = `${result.toLocaleString('tr-TR', {maximumFractionDigits: 2})} ${to}`;
}

// KLASİK DÖRT İŞLEM HESAP MAKİNESİ MANTIĞI
let calcExpr = "";

function calcNum(n) {
    calcExpr += n;
    document.getElementById('calc-display').innerText = calcExpr;
}

function calcOp(op) {
    if(calcExpr === "") return;
    calcExpr += op;
    document.getElementById('calc-display').innerText = calcExpr;
}

function calcClear() {
    calcExpr = "";
    document.getElementById('calc-display').innerText = "0";
    document.getElementById('calc-history').innerText = "";
}

function calcBackspace() {
    calcExpr = calcExpr.slice(0, -1);
    document.getElementById('calc-display').innerText = calcExpr || "0";
}

function calcEqual() {
    try {
        const res = eval(calcExpr);
        document.getElementById('calc-history').innerText = calcExpr + " =";
        document.getElementById('calc-display').innerText = res;
        calcExpr = res.toString();
    } catch(e) {
        document.getElementById('calc-display').innerText = "Hata";
        calcExpr = "";
    }
}