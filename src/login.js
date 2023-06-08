function checkLoginStatus() {
  const loginBtn = document.querySelector("#loginBtn");
  const nameTxt = document.querySelector("#name");
  if (gauth.isSignedIn.get()) {
    console.log("logined");
    loginBtn.value = "Logout";
    var profile = gauth.currentUser.get().getBasicProfile();
    nameTxt.innerHTML = "Welcome <strong>" + profile.getName() + "</strong> ";
  } else {
    console.log("logouted");
    loginBtn.value = "Login";
    nameTxt.innerHTML = "";
  }
}
function init() {
  console.log("init");
  gapi.load("auth2", function () {
    console.log("auth2");
    window.gauth = gapi.auth2.init({
      client_id:
        "873817326302-r4oj20vu78go03uhmgb2vpa3hih636gq.apps.googleusercontent.com",
    });
    gauth.then(
      function () {
        console.log("googleAuth success");
        checkLoginStatus();
      },
      function () {
        console.log("googleAuth fail");
      },
    );
  });
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
