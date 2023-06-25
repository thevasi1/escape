function login() {
    checkLoginData();
    window.location.replace("../form/form.html");
}

async function checkLoginData() {
    const data = {email: "guzami@at.me", password:"0000"}
    const headers = { "Content-Type": "application/json" };
    const init = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      };
  const res = await fetch("../../../backend/api/login/login_user.php", init);
  const jsonRes = JSON.parse(res);
  console.log(jsonRes);
  return jsonRes;
}