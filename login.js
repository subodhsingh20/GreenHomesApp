const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleButton = document.getElementById('toggle-button');
const toggleText = document.getElementById('toggle-text');
const formTitle = document.getElementById('form-title');
const message = document.getElementById('message');

let isLogin = true;

// Simple SHA-256 hash function using SubtleCrypto API
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Toggle between login and signup forms
toggleButton.addEventListener('click', () => {
    isLogin = !isLogin;
    if (isLogin) {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        formTitle.textContent = 'Login to Green Homes';
        toggleText.innerHTML = 'Don\'t have an account? <button id="toggle-button" class="btn-link">Sign Up</button>';
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        formTitle.textContent = 'Sign Up for Green Homes';
        toggleText.innerHTML = 'Already have an account? <button id="toggle-button" class="btn-link">Login</button>';
    }
    // Re-attach event listener to new toggle button
    document.getElementById('toggle-button').addEventListener('click', () => {
        toggleButton.click();
    });
    message.textContent = '';
});

// Helper to get users from localStorage
function getUsers() {
    const users = localStorage.getItem('greenHomesUsers');
    return users ? JSON.parse(users) : [];
}

// Helper to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('greenHomesUsers', JSON.stringify(users));
}

// Helper to get logged-in user from localStorage
function getLoggedInUser() {
    const user = localStorage.getItem('greenHomesLoggedInUser');
    return user ? JSON.parse(user) : null;
}

// Helper to set logged-in user in localStorage
function setLoggedInUser(user) {
    localStorage.setItem('greenHomesLoggedInUser', JSON.stringify(user));
}

// Helper to clear logged-in user from localStorage
function clearLoggedInUser() {
    localStorage.removeItem('greenHomesLoggedInUser');
}

// On page load, check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        message.style.color = 'blue';
        message.textContent = `Account already logged in as ${loggedInUser.name}. Please logout first to switch accounts.`;
        // Optionally disable forms to prevent login/signup while logged in
        loginForm.querySelectorAll('input, button').forEach(el => el.disabled = true);
        signupForm.querySelectorAll('input, button').forEach(el => el.disabled = true);
    }
});

// Login form submit handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        message.style.color = 'red';
        message.textContent = `You are already logged in as ${loggedInUser.name}. Please logout first.`;
        return;
    }
    const email = loginForm.email.value.trim().toLowerCase();
    const password = loginForm.password.value;
    const hashedPassword = await hashPassword(password);

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
        message.style.color = 'green';
        message.textContent = 'Login successful! Redirecting...';
        // Save logged in user info in localStorage for persistence
        setLoggedInUser({ name: user.name, email: user.email });
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        message.style.color = 'red';
        message.textContent = 'Invalid email or password.';
    }
});

// Signup form submit handler
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        message.style.color = 'red';
        message.textContent = `You are already logged in as ${loggedInUser.name}. Please logout first.`;
        return;
    }
    const name = signupForm.name.value.trim();
    const email = signupForm.email.value.trim().toLowerCase();
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;

    if (password !== confirmPassword) {
        message.style.color = 'red';
        message.textContent = 'Passwords do not match.';
        return;
    }

    const users = getUsers();
    if (users.find(u => u.email === email)) {
        message.style.color = 'red';
        message.textContent = 'Email is already registered. Please log in.';
        return;
    }

    const hashedPassword = await hashPassword(password);
    users.push({ name, email, password: hashedPassword });
    saveUsers(users);

    message.style.color = 'green';
    message.textContent = 'Sign up successful! You can now log in.';
    signupForm.reset();

    // Switch to login form after successful signup
    toggleButton.click();
});
