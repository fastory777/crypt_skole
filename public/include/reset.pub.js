const reset = document.getElementById("reset");
const oldPasswordInput = document.getElementById("oldPassword");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const resetButton = document.getElementById("resetButton");
const errorMessage = document.getElementById("errorMessage");
const resultReset = document.getElementById("resultReset");

function validateResetForm() {
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const passwordsMatch = newPassword === confirmPassword;
    const valid = oldPassword.length > 0 && newPassword.length >= 4 && passwordsMatch;

    resetButton.disabled = !valid;

    if (!oldPassword && !newPassword && !confirmPassword) {
        errorMessage.innerHTML = "";
    } else if (!oldPassword) {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "Skriv inn gammelt passord.";
    } else if (newPassword.length < 4) {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "Nytt passord må være minst 4 tegn.";
    } else if (!passwordsMatch) {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "X";
    } else {
        errorMessage.style.color = "green";
        errorMessage.innerHTML = "V";
    }

    return valid;
}

oldPasswordInput.addEventListener("input", validateResetForm);
newPasswordInput.addEventListener("input", validateResetForm);
confirmPasswordInput.addEventListener("input", validateResetForm);

reset.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateResetForm()) {
        return;
    }

    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const res = await fetch("/api/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            oldPassword: oldPassword,
            password: newPassword,
            confirmPassword: confirmPassword
        })
    });
    const data = await res.json();
    // console.log(data);

    if (res.ok && data.status === "success") {
        resultReset.innerHTML = "Passordet er byttet.";
        reset.reset();
        validateResetForm();
        return;
    }

    resultReset.innerHTML = data.message || "Passordbytte feilet.";
});

validateResetForm();
