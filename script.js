const USERS_KEY = 'trust_users';
const PROFITS_KEY = 'trust_profits';
const ADMIN_EMAIL = 'trustfundsspecialistcompany99@gmail.com';
const ADMIN_PASSWORD = 'nBABANDIT090';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function registerUser(email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return { success: false, message: 'Email already registered.' };
  users.push({ email, password });
  saveUsers(users);
  return { success: true };
}
function loginUser(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem('loggedIn', 'admin');
    return { success: true, role: 'admin' };
  }
  const user = getUsers().find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('loggedIn', email);
    return { success: true, role: 'client' };
  }
  return { success: false, message: 'Invalid credentials.' };
}
function logoutUser() {
  localStorage.removeItem('loggedIn');
}
function getLoggedInUser() {
  return localStorage.getItem('loggedIn');
}
function getProfit(email) {
  const profits = JSON.parse(localStorage.getItem(PROFITS_KEY)) || {};
  return profits[email] || { amount: 0, currency: 'USD' };
}
function getAllProfits() {
  return JSON.parse(localStorage.getItem(PROFITS_KEY)) || {};
}
function updateProfit(email, amount, currency) {
  const profits = getAllProfits();
  if (!profits[email]) profits[email] = { amount: 0, currency };
  profits[email].amount += amount;
  profits[email].currency = currency;
  localStorage.setItem(PROFITS_KEY, JSON.stringify(profits));
}

if (location.pathname.includes('login.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const result = loginUser(email, password);
      if (result.success) {
        location.href = result.role === 'admin' ? 'admin-dashboard.html' : 'dashboard.html';
      } else {
        alert(result.message);
      }
    });
  });
}

if (location.pathname.includes('register.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const result = registerUser(email, password);
      if (result.success) {
        alert('Registration successful!');
        location.href = 'login.html';
      } else {
        alert(result.message);
      }
    });
  });
}
