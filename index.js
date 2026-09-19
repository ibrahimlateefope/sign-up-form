const errorMessages = {
  firstName: {
    valueMissing: "Please enter your first name.",
    tooShort: "Enter at least two characters.",
  },
  lastName: {
    valueMissing: "Please enter your last name.",
    tooShort: "Enter at least two characters.",
  },
  email: {
    valueMissing: "Please enter your email address.",
    typeMismatch: "Enter a valid email address",
  },
  phoneNumber: {
    patternMismatch: "Enter an 11-digit phone number.",
    valueMissing: "Please enter your phone number.",
  },
  password: {
    valueMissing: "Please create your password",
    patternMismatch:
      "Use at least 8 characters, including an uppercase letter,a lowercase letter and a number",
    tooShort: "Enter at least 8 characters",
  },
  confirmPassword: {
    valueMissing: "Please confirm your password",
    customError: "Make sure password match",
  },
};
const form = document.querySelector("#sign-up");
const inputs = document.querySelectorAll("#sign-up input");

function getError(input) {
  const validity = input.validity;
  const messages = errorMessages[input.id];
  if (validity.valueMissing) return messages.valueMissing;
  if (validity.tooShort) return messages.tooShort;
  if (validity.typeMismatch) return messages.typeMismatch;
  if (validity.patternMismatch) return messages.patternMismatch;
  if (validity.customError) return messages.customError;
  return "";
}
function validateField(input) {
  if (input.id === "confirmPassword") {
    const password = document.getElementById("password");
    if (password.value === input.value) {
      input.setCustomValidity("");
    } else {
      input.setCustomValidity("Passwords do not match");
    }
  }
  const isValid = input.checkValidity();
  const field = input.closest(".field");
  const errorEl = document.getElementById(`${input.id}-error`);
  if (isValid) {
    field.classList.remove("field--invalid");
    field.classList.remove(".field--shake");
    errorEl.textContent = "";
  } else {
    field.classList.add("field--invalid");
    field.classList.remove("field--shake");
    void field.offsetWidth;
    field.classList.add("field--shake");
    errorEl.textContent = getError(input);
  }
  return isValid;
}
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    validateField(input);
  });

  input.addEventListener("input", () => {
    const isInvalid = input
      .closest(".field")
      .classList.contains("field--invalid");
    if (isInvalid) validateField(input);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = Array.from(inputs).map((input) => validateField(input));
  const allValid = result.every((isValid) => isValid);
  if (!allValid) {
    return;
  }
  form.submit();
});
