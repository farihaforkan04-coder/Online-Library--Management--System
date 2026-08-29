console.log("LOGIN FILE IS RUNNING");
import { getLoggedInUser, login, saveUser } from "./api.js";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const togglePassword = document.getElementById("togglePassword");

function showError(text) {
  message.textContent = text;

  message.classList.remove(
    "hidden",
    "bg-green-100",
    "text-green-700",
    "border-green-300"
  );

  message.classList.add(
    "bg-red-100",
    "text-red-700",
    "border-red-300"
  );
}

function clearMessage() {
  message.textContent = "";
  message.classList.add("hidden");
}

if (getLoggedInUser()?.token) {
  window.location.href = "./index.html";
}

togglePassword?.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";

  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "Hide" : "Show";
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  clearMessage();

  if (!email || !password) {
    showError("Please enter your email and password.");
    return;
  }

  try {
    const user = await login(email, password);

    saveUser(user);
    window.location.href = "./index.html";
  } catch (error) {
    showError(error.message);
  }
});