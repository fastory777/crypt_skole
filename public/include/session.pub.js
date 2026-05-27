const sessionP = document.getElementById("session");

async function checkSession() {
    const { checkAdmin } = await import("./tools.pub.js");
    const res = await fetch("/api/session");
    const data = await res.json();

    if (data.userId && data.userName) {
        sessionP.innerHTML = `
            <a href="index.html">Forside</a>
            <span>${data.userName} (id: ${data.userId}) logget inn</span>
            <a href="reset.html">Bytt passord</a>
            <a href="logout.html">Logg ut</a>
        `;

        if (await checkAdmin()) {
            sessionP.innerHTML += `<br /> Admin: <a href="users.html">Users</a>`;
        }

        return;
    }

    sessionP.innerHTML = `
        <a href="index.html">Forside</a>
        <a href="register.html">Registrer</a>
        <a href="login.html">Logg inn</a>
    `;
}

checkSession();
