function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    checkLoginData(email, password).then(message => {
        console.log(message);
        if (message["status"] != "200") {
            throw new Error(message["message"]);
          }
          else {
            window.location.replace("../form/form.html");
          }
    })
}

async function checkLoginData(email, password) {
    console.log(email, password);
    const headers = { "Content-Type": "application/json" };
    const init = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({"email-input": email, "password-input": password})
      };
  return fetch("../../../backend/api/login/login-user.php", init).then(res => {
	  console.log(res);
	  return res;
  })
}
