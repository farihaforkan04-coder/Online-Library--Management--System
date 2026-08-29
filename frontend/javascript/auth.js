const STORAGE_KEY = "library_user";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

function getRoleLabel(role) {
  if (role === "admin") return "Admin";
  if (role === "librarian") return "Librarian";
  return "Member";
}

window.getCurrentUser = function () {
  return getStoredUser();
};

window.getUserRole = function () {
  return getStoredUser()?.role || "member";
};

window.protectPage = function () {
  const user = getStoredUser();

  if (!user?.token) {
    window.location.href = "login.html";
    return false;
  }

  return true;
};

window.protectAdminPage = function () {
  const user = getStoredUser();

  if (!user?.token) {
    window.location.href = "login.html";
    return false;
  }

  const isStaff = user.role === "admin" || user.role === "librarian";

  if (!isStaff) {
    alert("Only library staff can access this page.");
    window.location.href = "index.html";
    return false;
  }

  return true;
};

window.showUserInfo = function (elementId) {
  const element = document.getElementById(elementId);
  const user = getStoredUser();

  if (element && user) {
    element.textContent = getRoleLabel(user.role);
  }
};

window.logout = function () {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "login.html";
};