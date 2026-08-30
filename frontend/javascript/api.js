const API_URL = "https://online-library-management-system-1-j2wn.onrender.com/api";
function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("library_user")) || null;
  } catch {
    return null;
  }
}
export function saveUser(user) {
  localStorage.setItem("library_user", JSON.stringify(user));
}
export function removeUser() {
  localStorage.removeItem("library_user");
}
export async function request(path, options = {}) {
  const user = getSavedUser();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(user?.token
        ? { Authorization: `Bearer ${user.token}` }
        : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}
export async function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
export async function register(name, email, password, phone) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, phone }),
  });
}
export async function getMyProfile() {
  return request("/auth/me");
}
export function getLoggedInUser() {
  return getSavedUser();
}