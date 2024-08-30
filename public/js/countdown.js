function updateCountdown(endTime, elementId) {
    const now = new Date();
    const timeRemaining = new Date(endTime) - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById(elementId).innerHTML = `
        ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds
    `;

    if (timeRemaining < 0) {
        clearInterval(interval);
        document.getElementById(elementId).innerHTML = "The event has started!";
    }
}

let interval = setInterval(() => updateCountdown(endTime, elementId), 1000);
