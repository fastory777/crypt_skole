const reset = document.getElementById("reset");
const message = document.getElementById("message");

reset.addEventListener("submit", async function (e) {
    e.preventDefault();

    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword.length < 4) {
        message.textContent = "Password must be at least 4 characters.";
        return;
    }

    if (newPassword !== confirmPassword) {
        message.textContent = "New passwords do not match.";
        return;
    }

    const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    });
    const data = await res.json();

    message.textContent = data.message || "Password reset failed.";
    if (res.ok) {
        reset.reset();
    }
});
