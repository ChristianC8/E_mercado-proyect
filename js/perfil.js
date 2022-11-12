document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("userProfileName")[0].innerHTML =
    localStorage.getItem("userId");
});
