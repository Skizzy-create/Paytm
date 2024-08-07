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
            const userCards = document.getElementById('user-cards');
            userCards.innerHTML = '';
            users.forEach(user => {
                const card = document.createElement('div');
                card.classList.add('user-card');
                card.innerHTML = `
                    <h3>${user.userName}</h3>
                    <p>First Name: ${user.firstName}</p>
                    <p>Last Name: ${user.lastName}</p>
                `;
                userCards.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

    toggleDarkMode();
    animateBackground();
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// function animateBackground() {
//     const background = document.getElementById('animated-background');
//     for (let i = 0; i < 20; i++) {
//         const object = document.createElement('div');
//         object.classList.add('animated-object');
//         object.style.left = Math.random() * 100 + 'vw';
//         object.style.top = Math.random() * 100 + 'vh';
//         background.appendChild(object);

//         setTimeout(() => {
//             object.style.transform = `translate(${Math.random() * 100 - 50}vw, ${Math.random() * 100 - 50}vh)`;
//             object.style.opacity = '0';
//         }, 100);
//     }

//     setTimeout(() => {
//         while (background.firstChild) {
//             background.removeChild(background.firstChild);
//         }
//         animateBackground();
//     }, 3000);
// }
