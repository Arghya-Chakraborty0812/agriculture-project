// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: e.target.username.value,
                passkey: e.target.password.value
            })
        });
        
        const result = await response.json();
        alert(result.message);
        
        if (result.redirect) {
            window.location.href = result.redirect;
        }
    } catch (error) {
        alert(error.message || 'Login failed');
        console.error('Error:', error);
    }
});

// Signup Form Handler
document.getElementById('signupForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: e.target.fullName.value,
                username: e.target.username.value,
                passkey: e.target.password.value
            })
        });
        
        const result = await response.json();
        alert(result.message);
        
        if (response.ok) {
            window.location.href = '/login.html';
        }
    } catch (error) {
        alert(error.message || 'Signup failed');
        console.error('Error:', error);
    }
});