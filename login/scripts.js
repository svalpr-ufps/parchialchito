const USER = "mor_2314";
const PASS = "83r5^_";

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);

    if (formData.get("user") === USER && formData.get("pass") === PASS) {
        localStorage.setItem("user", USER);
        window.location.href = "../app";
    } else {
        alert("Contraseña Incorrecta");
    }
});
