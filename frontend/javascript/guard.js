import {
  getLoggedInUser,
  getMyProfile,
  removeUser,
} from "./api.js";

const user = getLoggedInUser();

if (!user?.token) {
  window.location.href = "./login.html";
}

getMyProfile()
  .then((profile) => {
    const nameElements = document.querySelectorAll("[data-user-name]");

    nameElements.forEach((element) => {
      element.textContent = profile.name;
    });
  })
  .catch(() => {
    removeUser();
    window.location.href = "./login.html";
  });

document.querySelectorAll("[data-logout]").forEach((button) => {
  button.addEventListener("click", () => {
    removeUser();
    window.location.href = "./login.html";
  });
});