document.addEventListener('DOMContentLoaded', function () {
    fetch('https://paytm-e228.onrender.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const users = data.users; // Assuming the response has a 'users' key
            console.log('Fetched users:', users); // Debugging line to check the fetched data
            const userCardsContainer = document.getElementById('user-cards');
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');
                userCard.innerHTML = `
                    <h3>${user.firstName} ${user.lastName}</h3>
                    <p>Email: ${user.userName}</p>
                `;
                userCardsContainer.appendChild(userCard);
            });
        })
        .catch(error => console.error('Error fetching users:', error));

    // Animate the main heading with Framer Motion
    const heading = document.getElementById('main-heading');
    window.framer.motion.animate(heading, { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }, { duration: 2, repeat: Infinity });

    // Create and animate background objects with Framer Motion
    const background = document.getElementById('animated-background');
    for (let i = 0; i < 10; i++) {
        const object = document.createElement('div');
        object.classList.add('animated-object');
        object.style.top = `${Math.random() * 100}%`;
        object.style.left = `${Math.random() * 100}%`;
        background.appendChild(object);
        window.framer.motion.animate(object, { y: [0, -20, 20, 0], x: [0, 20, -20, 0] }, { duration: 5, repeat: Infinity, ease: "easeInOut" });
    }
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
