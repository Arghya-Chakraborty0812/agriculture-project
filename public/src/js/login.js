const signUp = document.querySelector("#signup");
const signUpForm = document.querySelector(".form-signup");
const signInForm = document.querySelector(".form-signin");

signUp.addEventListener("click", () => {
    console.log("signup was clicked");
    if(signInForm.style.visibility="visible"){
        signUpForm.style.visibility="visible";
        signInForm.style.visibility="hidden";
    }
});
