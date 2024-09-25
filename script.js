document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const birthdateInfoElement = document.getElementById('birthdate-info');
    const nameInput = document.getElementById('name-input');
    const dayInput = document.getElementById('day-input');
    const monthInput = document.getElementById('month-input');
    const generateLinkButton = document.getElementById('generate-link');
    const newCountdownButton = document.getElementById('new-countdown');
    const goBackButton = document.getElementById('go-back');
    const countdownHeading = document.getElementById('countdown-heading');
    const birthdayNameElement = document.getElementById('birthday-name');
    const optionsDiv = document.getElementById('options');

    let countdownInterval;
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const updateCountdown = (name, day, month) => {
        const currentTime = new Date();
        let birthdayDate = new Date(currentTime.getFullYear(), month - 1, day);
        if (currentTime > birthdayDate) {
            birthdayDate.setFullYear(currentTime.getFullYear() + 1);
        }

        const timeRemaining = birthdayDate - currentTime;
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        countdownElement.innerHTML = `
            <div class="countdown-box">${days}<div class="legend">Days</div></div>
            <div class="countdown-box">${hours}<div class="legend">Hours</div></div>
            <div class="countdown-box">${minutes}<div class="legend">Minutes</div></div>
            <div class="countdown-box">${seconds}<div class="legend">Seconds</div></div>
        `;

        birthdateInfoElement.innerText = `Birth Date: ${day} ${monthNames[month - 1]}`;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = `<div class="wish-message">Happy Birthday, ${name}!</div>`;
            birthdateInfoElement.innerText = '';
            newCountdownButton.style.display = 'block';
            optionsDiv.style.display = 'block'; // Show options when countdown is finished
        }
    };

    generateLinkButton.addEventListener('click', () => {
        const name = nameInput.value;
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);

        if (name && day && month) {
            clearInterval(countdownInterval);
            countdownInterval = setInterval(() => updateCountdown(name, day, month), 1000);
            updateCountdown(name, day, month);

            document.getElementById('input-form').style.display = 'none';
            countdownHeading.style.display = 'block';
            countdownElement.style.display = 'flex';
            birthdayNameElement.innerText = name;
            optionsDiv.style.display = 'none'; // Ensure options are hidden at the start
            goBackButton.style.display = 'block'; // Show the Go Back button
        }
    });

    newCountdownButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdownHeading.style.display = 'none';
        countdownElement.style.display = 'none';
        newCountdownButton.style.display = 'none';
        optionsDiv.style.display = 'none'; // Hide options when creating a new countdown
        document.getElementById('input-form').style.display = 'flex';
    });

    goBackButton.addEventListener('click', () => {
        countdownHeading.style.display = 'none';
        countdownElement.style.display = 'none';
        newCountdownButton.style.display = 'none';
        optionsDiv.style.display = 'none'; // Hide options when going back
        document.getElementById('input-form').style.display = 'flex';
    });
});