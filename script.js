// Load existing data or start fresh
let weeklyLog = JSON.parse(localStorage.getItem('energyLog')) || [0, 0, 0, 0, 0, 0, 0];

function addToLog() {
    // 1. Grab hours for ALL appliances at once (defaults to 0 if left blank)
    const acHrs = parseFloat(document.getElementById('hrs-ac').value) || 0;
    const fridgeHrs = parseFloat(document.getElementById('hrs-fridge').value) || 0;
    const tvHrs = parseFloat(document.getElementById('hrs-tv').value) || 0;
    const lightHrs = parseFloat(document.getElementById('hrs-light').value) || 0;

    // 2. Calculate individual usage (kW rating * hours)
    const acUsage = acHrs * 1.5;
    const fridgeUsage = fridgeHrs * 0.15;
    const tvUsage = tvHrs * 0.1;
    const lightUsage = lightHrs * 0.05;

    // 3. Sum total daily usage
    const dailyUsage = acUsage + fridgeUsage + tvUsage + lightUsage;
    
    const dayIndex = parseInt(document.getElementById('log-day').value);
    const goal = parseFloat(document.getElementById('region').value);
    const price = 0.83; // PGK per kWh

    const dailyCost = dailyUsage * price;

    // Save to the specific day
    weeklyLog[dayIndex] = dailyUsage;
    localStorage.setItem('energyLog', JSON.stringify(weeklyLog));

    // Update the UI Popup
    document.getElementById('daily-kwh').innerText = dailyUsage.toFixed(2);
    document.getElementById('daily-cost').innerText = 'K' + dailyCost.toFixed(2);
    document.getElementById('month-proj').innerText = (dailyUsage * 30).toFixed(1);

    const status = document.getElementById('status-text');
    const savings = document.getElementById('savings-val');

    // Benchmark Logic
    if (dailyUsage > goal) {
        status.innerText = "EXCEEDS DAILY BENCHMARK";
        status.style.color = "#fbbf24";
        savings.innerText = "K" + ((dailyUsage - goal) * price).toFixed(2) + " Over Budget Today";
    } else {
        status.innerText = "WITHIN SUSTAINABLE LIMIT";
        status.style.color = "#10b981";
        savings.innerText = "Efficiency Target Met";
    }

    document.getElementById('result-popup').style.display = 'block';
}