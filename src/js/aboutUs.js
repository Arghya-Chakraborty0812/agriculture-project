let btn1 = document.querySelector("input");
let body = document.querySelector("body");

let curr = "light";

btn1.addEventListener("click", () => {
    if(curr === "light")
    {
        curr = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
        
    }
    else{
        curr = "light";
        body.classList.add("light");
        body.classList.remove("dark");
        
    }

});