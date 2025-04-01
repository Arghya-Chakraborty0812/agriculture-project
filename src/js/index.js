const questions = document.querySelectorAll("#question");


questions.forEach((question) => {
    question.addEventListener("click", () => {
        console.log("question clicked");
        const answer = question.nextElementSibling;
        if (answer.style.display === "none" || answer.style.display === "") {
            answer.style.display = "block"; // Show answer
        } else {
            answer.style.display = "none"; // Hide answer
        }
        
    });
    
});