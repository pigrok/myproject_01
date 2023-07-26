function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  const id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

function signOut() {
  gapi.auth2.getAuthInstance().disconnect();
}
