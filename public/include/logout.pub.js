const params = new URLSearchParams(window.location.search);

async function logout() {
    if (params.get("a") !== "logout") {
        return;
    }

    const res = await fetch("/api/logout", {
        method: "POST"
    });
    const data = await res.json();

    if (res.ok && data.status === "success") {
        window.location.href = data.redirectTo || "index.html";
        return;
    }

    alert("Logout failed");
}

logout();
