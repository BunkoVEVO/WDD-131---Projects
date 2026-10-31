const form = document.querySelector("#eventForm");
const ticketType = document.querySelector("#ticketType");
const typeInfo = document.querySelector("#typeInfo");
const typeCode = document.querySelector("#typeCode");
const typeCodeLabel = document.querySelector("#typeCodeLabel");
const typeCodeHint = document.querySelector("#typeCodeHint");
const eventDate = document.querySelector("#eventDate");
const feedback = document.querySelector("#feedback");

// Set the earliest allowed event date to tomorrow.
function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Build a local YYYY-MM-DD value without UTC timezone conversion.
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

eventDate.min = getTomorrow();

// Show the correct extra field when the user chooses Student or Guest.
function updateTypeField() {
  const selectedType = ticketType.value;

  if (selectedType === "student") {
    typeInfo.hidden = false;
    typeCodeLabel.textContent = "Student I#";
    typeCodeHint.textContent = "Enter your 9-digit student I number.";
    typeCode.placeholder = "Example: 123456789";
    typeCode.inputMode = "numeric";
    typeCode.maxLength = 9;
    typeCode.required = true;
  } else if (selectedType === "guest") {
    typeInfo.hidden = false;
    typeCodeLabel.textContent = "Access Code";
    typeCodeHint.textContent = "Enter the event access code: EVENT131.";
    typeCode.placeholder = "EVENT131";
    typeCode.inputMode = "text";
    typeCode.maxLength = 8;
    typeCode.required = true;
  } else {
    typeInfo.hidden = true;
    typeCode.required = false;
    typeCode.value = "";
  }

  feedback.replaceChildren();
}

ticketType.addEventListener("change", updateTypeField);

// Return an array of validation messages.
function validateForm() {
  const errors = [];
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const selectedType = ticketType.value;
  const code = typeCode.value.trim();

  if (!firstName) errors.push("Please enter your first name.");
  if (!lastName) errors.push("Please enter your last name.");

  if (!email) {
    errors.push("Please enter your email address.");
  } else if (!form.email.validity.valid) {
    errors.push("Please enter a valid email address.");
  }

  if (!eventDate.value) {
    errors.push("Please choose an event date.");
  } else if (eventDate.value < getTomorrow()) {
    errors.push("The event date must be later than today.");
  }

  if (!selectedType) {
    errors.push("Please select Student or Guest from the Type menu.");
  } else if (selectedType === "student" && !/^\d{9}$/.test(code)) {
    errors.push("Your Student I# must contain exactly 9 digits.");
  } else if (selectedType === "guest" && code !== "EVENT131") {
    errors.push("Guests must enter the access code EVENT131.");
  }

  return errors;
}

function showErrors(errors) {
  const box = document.createElement("div");
  box.className = "error-box";

  const heading = document.createElement("h2");
  heading.textContent = "Please fix the following errors:";
  box.appendChild(heading);

  const list = document.createElement("ul");
  errors.forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    list.appendChild(item);
  });

  box.appendChild(list);
  feedback.replaceChildren(box);
}

function showTicket() {
  const selectedType = ticketType.value;
  const box = document.createElement("div");
  box.className = "ticket";

  const heading = document.createElement("h2");
  heading.textContent = "Registration Successful!";
  box.appendChild(heading);

  const details = [
    `Name: ${form.firstName.value.trim()} ${form.lastName.value.trim()}`,
    `Email: ${form.email.value.trim()}`,
    `Event date: ${eventDate.value}`,
    `Ticket type: ${selectedType === "student" ? "Student" : "Guest"}`
  ];

  details.forEach((detail) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    box.appendChild(paragraph);
  });

  const ticketNumber = document.createElement("p");
  ticketNumber.className = "ticket-number";
  ticketNumber.textContent = `Confirmation: EVT-${Date.now().toString().slice(-8)}`;
  box.appendChild(ticketNumber);

  feedback.replaceChildren(box);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.replaceChildren();

  const errors = validateForm();

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  showTicket();
  form.reset();
  eventDate.min = getTomorrow();
  updateTypeField();
});
