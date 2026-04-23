const reg = document.getElementById("register");
const userNameInput = document.getElementById("userName");
const passwordInput = document.getElementById("password");
const registerButton = document.getElementById("registerButton");
const message = document.getElementById("message");

passwordInput.addEventListener("input", function () {
    if (passwordInput.value.length >= 4) {
        registerButton.disabled = false;
        message.textContent = "";
        return;
    }

    registerButton.disabled = true;
    message.textContent = "Password must be at least 4 characters.";
});

reg.addEventListener("submit", async function (e) {
    e.preventDefault();
    const un = userNameInput.value;
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

    if (res.ok && data.result) {
        message.textContent = `User ${un} is registered with id ${data.result.lastID}.`;
        reg.reset();
        registerButton.disabled = true;
        return;
    }

    message.textContent = data.message || "Registration failed.";
});