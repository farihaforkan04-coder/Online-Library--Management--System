import { getLoggedInUser, register, saveUser } from "./api.js";

const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");

if (getLoggedInUser()?.token) {
  window.location.href = "./index.html";
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  if (password.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters.";
    errorMessage.classList.remove("hidden");
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    errorMessage.classList.remove("hidden");
    return;
  }

  try {
    const user = await register(name, email, password, phone);

    saveUser(user);
    window.location.href = "./index.html";
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});