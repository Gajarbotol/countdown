const fs = require('fs');
const path = require('path');
const countdownsFile = path.join(__dirname, '../data/countdowns.json');

const saveCountdowns = (countdowns) => {
    fs.writeFileSync(countdownsFile, JSON.stringify(countdowns, null, 4));
};

const loadCountdowns = () => {
    return JSON.parse(fs.readFileSync(countdownsFile, 'utf-8'));
};

const findCountdownsByUserId = (userId) => {
    const countdowns = loadCountdowns();
    return countdowns.filter(countdown => countdown.userId === userId);
};

const findCountdownById = (id) => {
    const countdowns = loadCountdowns();
    return countdowns.find(countdown => countdown.id === id);
};

const addCountdown = (countdown) => {
    const countdowns = loadCountdowns();
    countdown.id = Date.now().toString();
    countdowns.push(countdown);
    saveCountdowns(countdowns);
    return countdown;
};

const updateCountdown = (updatedCountdown) => {
    let countdowns = loadCountdowns();
    countdowns = countdowns.map(countdown => countdown.id === updatedCountdown.id ? updatedCountdown : countdown);
    saveCountdowns(countdowns);
};

const deleteCountdown = (id) => {
    let countdowns = loadCountdowns();
    countdowns = countdowns.filter(countdown => countdown.id !== id);
    saveCountdowns(countdowns);
};

module.exports = {
    findCountdownsByUserId,
    findCountdownById,
    addCountdown,
    updateCountdown,
    deleteCountdown
};
