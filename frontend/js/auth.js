// ================================
// AUTH.JS
// ================================

const defaultUsers = [

    {
        id: 1,
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin"
    },

    {
        id: 2,
        name: "Member",
        email: "member@gmail.com",
        password: "member123",
        role: "member"
    }

];


// ================================
// GET USERS
// ================================

function getUsers() {

    let users =
        JSON.parse(
            localStorage.getItem("libraryUsers")
        );


    if (!Array.isArray(users)) {

        users = defaultUsers;

        localStorage.setItem(
            "libraryUsers",
            JSON.stringify(users)
        );

    }


    return users;

}


// ================================
// SAVE USERS
// ================================

function saveUsers(users) {

    localStorage.setItem(
        "libraryUsers",
        JSON.stringify(users)
    );

}


// ================================
// GET CURRENT USER
// ================================

function getCurrentUser() {

    const user =
        localStorage.getItem("currentUser");


    if (!user) {

        return null;

    }


    try {

        return JSON.parse(user);

    } catch (error) {

        localStorage.removeItem("currentUser");

        return null;

    }

}


// ================================
// GET USER ROLE
// ================================

function getUserRole() {

    const user =
        getCurrentUser();


    if (!user) {

        return null;

    }


    return user.role;

}


// ================================
// CHECK ADMIN
// ================================

function isAdmin() {

    return getUserRole() === "admin";

}


// ================================
// LOGIN
// ================================

function login(email, password) {

    const users =
        getUsers();


    const user =
        users.find(function(item) {

            return (

                String(item.email)
                    .toLowerCase() ===
                String(email)
                    .toLowerCase() &&

                item.password === password

            );

        });


    if (!user) {

        return false;

    }


    const currentUser = {

        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role

    };


    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    return true;

}


// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    localStorage.removeItem(
        "authToken"
    );

    window.location.href =
        "login.html";

}


// ================================
// PROTECT NORMAL PAGE
// ================================

// function protectPage() {

//     const user =
//         getCurrentUser();


//     if (!user) {

//         window.location.href =
//             "login.html";

//         return false;

//     }


//     return true;

// }


// ================================
// PROTECT ADMIN PAGE
// ================================

function protectAdminPage() {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return false;

    }


    if (user.role !== "admin") {

        alert(
            "Only admin can access this page."
        );

        window.location.href =
            "index.html";

        return false;

    }


    return true;

}


// ================================
// SHOW USER INFO
// ================================

function showUserInfo(elementId) {

    const element =
        document.getElementById(elementId);


    if (!element) {

        return;

    }


    const role =
        getUserRole();


    if (role === "admin") {

        element.textContent =
            "Admin";

    } else if (role === "member") {

        element.textContent =
            "Member";

    } else {

        element.textContent =
            "";

    }

}


// ================================
// SAVE TOKEN
// ================================

function saveToken(token) {

    localStorage.setItem(
        "authToken",
        token
    );

}


// ================================
// GET TOKEN
// ================================

function getToken() {

    return localStorage.getItem(
        "authToken"
    );

}


// ================================
// REQUIRE ADMIN
// ================================

function requireAdmin() {

    if (!isAdmin()) {

        alert(
            "Admin access required."
        );

        window.location.href =
            "index.html";

        return false;

    }


    return true;

}