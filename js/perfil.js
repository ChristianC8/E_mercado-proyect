document.addEventListener("DOMContentLoaded", function(){
    document.getElementsByClassName("userProfileName")[0].innerHTML = localStorage.getItem("userId")
/*     document.getElementsByClassName("userProfileName").value
    console.log( document.getElementsByClassName("userProfileName")[0].innerHTML) */
});