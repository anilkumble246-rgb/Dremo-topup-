// LocalStorage based Mock Authentication
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

document.addEventListener('DOMContentLoaded', () => {
  updateUserUI();
});

function updateUserUI() {
  const authNav = document.getElementById('authNav');
  const userNav = document.getElementById('userNav');
  const displayUsername = document.getElementById('displayUsername');

  if (currentUser) {
    authNav.style.display = 'none';
    userNav.style.display = 'flex';
    displayUsername.textContent = currentUser.name || currentUser.username;
  } else {
    authNav.style.display = 'block';
    userNav.style.display = 'none';
  }
}

// Modal open/close
function openModal(tab = 'login') {
  document.getElementById('authModal').style.display = 'flex';
  switchTab(tab);
}

function closeModal() {
  document.getElementById('authModal').style.display = 'none';
}

function switchTab(tab) {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
  }
}

// Register
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;

  const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  if (users.find(u => u.email === email || u.username === username)) {
    alert('এই ইমেইল বা ইউজারনেম দিয়ে ইতোমধ্যে একাউন্ট খোলা হয়েছে!');
    return;
  }

  const newUser = { name, username, email, pass };
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));

  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  alert('রেজিস্ট্রেশন সফল হয়েছে!');
  closeModal();
  updateUserUI();
}

// Login
function handleLogin(e) {
  e.preventDefault();
  const loginId = document.getElementById('loginId').value.trim();
  const pass = document.getElementById('loginPass').value;

  const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const found = users.find(u => (u.email === loginId || u.username === loginId) && u.pass === pass);

  if (found) {
    currentUser = found;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert('লগইন সফল হয়েছে!');
    closeModal();
    updateUserUI();
  } else {
    alert('ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড!');
  }
}

// Logout
function logoutUser() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateUserUI();
  alert('লগআউট করা হয়েছে।');
}

// Topup Continue Validation
function handleContinue() {
  // Check Login
  if (!currentUser) {
    alert('⚠️ টপ-আপ করতে হলে অবশ্যই প্রথমে একাউন্ট লগইন থাকতে হবে!');
    openModal('login');
    return;
  }

  // Check UID
  const uid = document.getElementById('playerUid').value.trim();
  if (!uid) {
    alert('অনুগ্রহ করে সঠিক Player UID বসান!');
    return;
  }

  alert(`✅ অর্ডার গ্রহণ করা হয়েছে!\n\nইউজার: ${currentUser.name}\nPlayer UID: ${uid}\nঅফার: ৫ টাকা উইকলি`);
}
