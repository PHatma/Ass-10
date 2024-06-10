var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var element = document.getElementById("msg");
var home = document.getElementById("home");
var btn = document.getElementById("btn");

var usersList = [];
if (localStorage.getItem("container") !== null) {
  usersList = JSON.parse(localStorage.getItem("container"));
}
function signup() {
  if (
    (validationuserName() && validationEmail() && validationPassword()) == true
  ) {
    var user = {
      name: username.value,
      useremail: email.value,
      userpassword: password.value,
    };
    if (isEmpty() == false) {
      element.innerText += "All Input Is Required";
    } else if (isEmailExist() == false) {
      element.innerText += "Email Exist";
    } else {
      element.innerText += "Success";
      element.style.cssText = ` color: green !important 
    `;
      usersList.push(user);
      localStorage.setItem("container", JSON.stringify(usersList));
      clear();
      console.log(usersList);
      window.location.assign("index.html");
    }
  }
}
function login() {
  var emaillogin = document.getElementById("email").value;
  var passwordlogin = document.getElementById("password").value;
  if (isLoginEmpty() == false) {
    element.innerText += "All Input Is Required";
  } else {
    for (var i = 0; i <= usersList.length; i++) {
      if (
        usersList[i].email.toLowerCase() == emaillogin.toLowerCase() &&
        usersList[i].password.toLowerCase() == passwordlogin.toLowerCase()
      ) {
        localStorage.setItem(
          "sessionUsername",
          usersList[i].name.toLowerCase()
        );
        window.location.assign("home.html");
        btn.addEventListener("click", function () {
          home.innerHTML += " " + localStorage.getItem("sessionUsername");
        });
        clearlogin();
      } else {
        element.innerText += "incorrect email or password";
      }
    }
  }
}

function clearlogin() {
  email.value = null;
  password.value = null;
}
function clear() {
  username.value = null;
  email.value = null;
  password.value = null;
}
function isEmpty() {
  if (username.value == "" || email.value == "" || password.value == "") {
    return false;
  } else {
    return true;
  }
}
function isLoginEmpty() {
  if (email.value == "" || password.value == "") {
    return false;
  } else {
    return true;
  }
}
function isEmailExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email.toLowerCase() == email.value.toLowerCase()) {
      return false;
    }
  }
}
function validationuserName() {
  var regexUserName = /^[a-z0-9_-|A-Z0-9]{3,15}$/;
  var text = username.value;
  if (regexUserName.test(text) == true) {
    username.classList.add("is-valid");
    username.classList.remove("is-invalid");

    return true;
  } else {
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");

    return false;
  }
}
function validationEmail() {
  var regexUseremail = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/;
  var mail = email.value;
  if (regexUseremail.test(mail) == true) {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");

    return true;
  } else {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");

    return false;
  }
}
function validationPassword() {
  var regexUserPass = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
  var pass = password.value;
  if (regexUserPass.test(pass) == true) {
    password.classList.add("is-valid");
    password.classList.remove("is-invalid");

    return true;
  } else {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");

    return false;
  }
}
function logout() {
  localStorage.removeItem("sessionUsername");
  window.location.assign("index.html");
}
