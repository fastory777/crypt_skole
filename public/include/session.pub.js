const sessionP = document.getElementById("session");

async function checkSession() {
    const res = await fetch("/api/session");
    const data = await res.json();

    if (data.userId && data.userName) {
        sessionP.innerHTML = `
            <a href="index.html">Forside</a>
            <span>${data.userName} (id: ${data.userId}) logget inn</span>
            <a href="reset.html">Bytt passord</a>
            <a href="#" id="logoutLink">Logg ut</a>
        `;

        document.getElementById("logoutLink").addEventListener("click", async function (e) {
            e.preventDefault();
            await fetch("/api/logout", { method: "POST" });
            window.location.href = "index.html";
        });
        return;
    }

    sessionP.innerHTML = `
        <a href="index.html">Forside</a>
        <a href="register.html">Registrer</a>
        <a href="login.html">Logg inn</a>
    `;
}

checkSession();
