const logoutButton = document.getElementById("logoutButton");
const logoutMessage = document.getElementById("logoutMessage");

async function logout() {
    const res = await fetch("/api/logout", {
        method: "POST"
    });
    const data = await res.json();

    if (res.ok && data.status === "success") {
        window.location.href = data.redirectTo || "index.html";
        return;
    }

    logoutMessage.textContent = data.message || "Logout failed";
}

logoutButton.addEventListener("click", logout);
