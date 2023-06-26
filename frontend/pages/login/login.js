function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    checkLoginData(email, password).then(message => {
        if (message["status"] != "200") {
            throw new Error(message["message"]);
          }
          else {
            window.location.replace("../form/form.html");
          }
    })
}

function checkLoginData(email, password) {
    const headers = { "Content-Type": "application/json" };
    const init = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({"email-input": email, "password-input": password})
      };
  return fetch("../../../backend/api/login/login-user.php", init).then(res => {
	  return res;
  })
}

function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    checkRegisterData(username, email, password).then(message => {
        if (message["status"] != "200") {
            throw new Error(message["message"]);
          }
          else {
            window.location.replace("../form/form.html");
          }
    })
}

function checkRegisterData(username, email, password) {
    const headers = { "Content-Type": "application/json" };
    const init = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({"username": username, "email-register": email, "password-register": password})
      };
  return fetch("../../../backend/api/register/register.php", init).then(res => {
	  return res;
  })
}
