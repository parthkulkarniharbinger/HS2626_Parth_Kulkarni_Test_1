const recordList = document.getElementById('recordList');
const medicalRecords = [
  { id: 1, date: '2022-01-01', diagnosis: 'Cold', medication: 'Antibiotics' },
  { id: 2, date: '2022-03-15', diagnosis: 'Allergy', medication: 'Antihistamines' },
  { id: 3, date: '2022-05-10', diagnosis: 'Headache', medication: 'Painkillers' }
];
medicalRecords.forEach(record => {
  const li = document.createElement('li');
  li.textContent = `Date: ${record.date}, Diagnosis: ${record.diagnosis}, Medication: ${record.medication}`;
  recordList.appendChild(li);
});
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');
const messageList = document.getElementById('messageList');
sendMessageButton.addEventListener('click', function(event) {
  event.preventDefault();
  const messageContent = messageInput.value;
  messageInput.value = '';
  alert('Message sent!');
  const li = document.createElement('li');
  li.textContent = messageContent;
  messageList.appendChild(li);
});
document.addEventListener('DOMContentLoaded', function() {
  const appointmentForm = document.getElementById('appointmentForm');
  appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    clearWarnings();
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const dateInput = document.getElementById('dateInput').value.trim();
    const reasonInput = document.getElementById('reasonInput').value.trim();
    let valid = true;
    if (nameInput === '' || nameInput.length > 30) {
      displayWarning('nameWarning', 'Please enter a valid name (maximum 30 characters).');
      valid = false;
    }
    if (!isValidEmail(emailInput)) {
      displayWarning('emailWarning', 'Please enter a valid email address.');
      valid = false;
    }
    if (!isValidDate(dateInput)) {
      displayWarning('dateWarning', 'Please enter a valid appointment date (YYYY-MM-DD).');
      valid = false;
    }
    if (valid) {
      appointmentForm.reset();
    }
  });
  function clearWarnings() {
    const nameWarning = document.getElementById('nameWarning');
    const emailWarning = document.getElementById('emailWarning');
    const dateWarning = document.getElementById('dateWarning');
    nameWarning.textContent = '';
    emailWarning.textContent = '';
    dateWarning.textContent = '';
  }
  function displayWarning(id, message) {
    const warning = document.getElementById(id);
    warning.textContent = message;
  }
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }
});
