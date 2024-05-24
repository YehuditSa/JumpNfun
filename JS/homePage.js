//Declaring object for the user data
let user = {
  email: "",
  password: "",
  username: "",
  highScore: "",
};

//Geting some elements fron DOM for useing in the program
let signupNavButton = document.querySelector(".signup div");
let loginNavButton = document.querySelector(".login div");
let welcome = document.getElementById("welcome");
let loginAndSignupDiv = document.getElementById("loginAndSignupDiv");
let loginDiv = document.getElementById("loginDiv");
let signupDiv = document.getElementById("signupDiv");
let isUser;

loginAndSignupDiv.style.display = "none";

//when pressing on the buttons in the nav - sign in / log in / log out
signupNavButton.addEventListener("click", () => {
  loginAndSignupDiv.style.display = "inline-block";
  sighupFirst();
});


loginNavButton.addEventListener("click", () => {
  loginFirst();
  if (isUser) {
    guestMode();
  }
  else {
    loginAndSignupDiv.style.display = "inline-block";
  }
});

//Checking what is the currentUser now, and call the functions guess/user according to it.
let currentUser = localStorage.getItem("currentUser");
if (localStorage.getItem("currentUser") === null || JSON.parse(localStorage.getItem("currentUser")).username === "Guest") {
  guestMode();
} else {
  userMode();
}


document.getElementById("signupForm").addEventListener("submit", signUp);
document.getElementById("loginForm").addEventListener("submit", login);

function loginFirst() {
  loginDiv.style.display = "block";
  signupDiv.style.display = "none";
}

function sighupFirst() {
  loginDiv.style.display = "none";
  signupDiv.style.display = "block";
}

function guestMode() {
  isUser = false;
  user.username = "Guest";
  user.highScore = "0";
  user.email = "guest@example.com";
  localStorage.setItem("currentUser", JSON.stringify(user));
  loginNavButton.innerHTML = "Log in";
  welcome.innerText = "Welcome Guest";
}

function userMode() {
  isUser = true;
  loginNavButton.innerHTML = "Log out";
  welcome.innerText = "Welcome " + JSON.parse(localStorage.getItem("currentUser")).username;
  isFromUser = true;
}

function signUp(event) {
  event.preventDefault();
  let isValidInput = true;
  user.username = document.getElementById("signupUsername").value;
  user.password = document.getElementById("signupPassword").value;
  user.email = document.getElementById("signupEmail").value;

  //Check if the user entered the all values
  if (user.username === "" || user.password === "" || user.email === "") {
    isValidInput = false;
  }

  // Check if this username already exist
  let key = localStorage.getItem(user.email);
  if (key !== null) {
    let emailExist = document.getElementById("emailExist");
    emailExist.innerText = "You already have an account. Please try to log in.";
    setTimeout(() => {
      emailExist.innerText = "";
    }, 2000);
    isValidInput = false;
  }

  //If the input is valid
  if (isValidInput) {
    localStorage.setItem(user.email, JSON.stringify(user));
    loginAndSignupDiv.style.display = "none";
    localStorage.setItem("currentUser", JSON.stringify(user));
    userMode();
  }
}

function login(event) {
  event.preventDefault();
  user.email = document.getElementById("loginEmail").value;
  user.password = document.getElementById("loginPassword").value;

  let key = localStorage.getItem(user.email);

  //If the input's email doesn't exist in data
  if (key === null) {
    let emailNotExist = document.getElementById("emailNotExist");
    emailNotExist.innerText = "This email doesn't exist. please sign up.";
    setTimeout(() => {
      emailNotExist.innerText = "";
    }, 2000);
  }

  //If the input's email exists in data
  else {
    //If the input's password is incorrect
    if (JSON.parse(key).password !== user.password) {
      let incorrectPassword = document.getElementById("incorrectPassword");
      incorrectPassword.innerText = "incorrect password. please try again.";
      setTimeout(() => {
        incorrectPassword.innerText = "";
      }, 2000);
    }

    //If the all input is correct
    else {
      localStorage.setItem("currentUser", localStorage.getItem(user.email));
      loginAndSignupDiv.style.display = "none";
      userMode();
    }
  }
}


//Switch from Sign up to login on click
let fromSignupToLogin = document.getElementById("fromSignupToLogin");
fromSignupToLogin.addEventListener("click", () => {
  loginDiv.style.display = "block";
  signupDiv.style.display = "none";
});

//Switch from login to Sign up on click
let fromLoginToSignup = document.getElementById("fromLoginToSignup");
fromLoginToSignup.addEventListener("click", () => {
  loginDiv.style.display = "none";
  signupDiv.style.display = "block";
});


//The x button - to close the div
document.getElementById("x").addEventListener("click", () => loginAndSignupDiv.style.display = "none");
