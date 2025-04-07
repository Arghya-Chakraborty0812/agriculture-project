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



document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const form = e.target;
    const formData = new FormData(form);

    const data = {
        fullName: formData.get('fullUserName'),
        username: formData.get('username'),
        passkey: formData.get('passkey')
    };

    try {
        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.status === 201) {
            alert(result.message); // Shows success alert
            form.reset(); // Optional: clear the form
        } else {
            alert("Signup failed: " + result.message); // Show error
        }
    } catch (error) {
        alert("Something went wrong!");
        console.error(error);
    }
});

