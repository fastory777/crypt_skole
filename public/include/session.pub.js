const sessionP = document.getElementById("session");

async function checkSession() {
    const res = await fetch("/api/session");
    const data = await res.json();

    sessionP.innerHTML = '<a href="index.html">Back to front page</a> -- <a href="register.html">Register</a> -- <a href="login.html">Login</a>';

    if (data.userId && data.userName) {
        sessionP.innerHTML += `<br>${data.userName} (id: ${data.userId}) logged in`;
        sessionP.innerHTML += '<br><a href="reset.html">Reset password</a> -- <a href="#" id="logoutLink">Logout</a>';

        document.getElementById("logoutLink").addEventListener("click", async function (e) {
            e.preventDefault();
            await fetch("/api/logout", { method: "POST" });
            window.location.href = "index.html";
        });
    }
}

checkSession();
