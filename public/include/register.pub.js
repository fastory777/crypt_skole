const reg = document.getElementById("register");
const passwordInput = document.getElementById("password");
const registerButton = document.getElementById("registerButton");

function updateRegisterButton() {
    registerButton.disabled = passwordInput.value.length < 4;
}

updateRegisterButton();
passwordInput.addEventListener("input", updateRegisterButton);

reg.addEventListener("submit", async function (e) {
    e.preventDefault();

    const un = document.getElementById("userName").value;
    const p = passwordInput.value;

    const res = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: un,
            password: p
        })
    });

    const data = await res.json();
    console.log(data);
});
