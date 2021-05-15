function validateForm() {
  var username = document.forms["login"]["username"].value;
  var password = document.forms["login"]["password"].value;
  if (username == "" || password == "") return false;
  if (username.length < 6 || password.length < 6) return false; 
  if (username.length > 32 || password.length > 32) return false;
  return true;
}