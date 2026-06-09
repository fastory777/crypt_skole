const sessionP = document.getElementById("session");
const menu = document.getElementById("menu");

function renderMenu(links) {
    if (!menu) {
        return;
    }

    menu.innerHTML = links
        .map((link) => `<a href="${link.href}" class="${link.className || ""}">${link.label}</a>`)
        .join("");
}

async function checkSession() {
    const { checkAdmin } = await import("./tools.pub.js");
    const res = await fetch("/api/session");
    const data = await res.json();

    if (data.userId && data.userName) {
        if (menu) {
            sessionP.textContent = `${data.userName} (id: ${data.userId}) er logget inn.`;

            const links = [
                { href: "index.html", label: "Forside" },
                { href: "reset.html", label: "Bytt passord" },
                { href: "logout.html", label: "Logg ut" }
            ];

            if (await checkAdmin()) {
                links.push({ href: "users.html", label: "Users", className: "admin-button" });
            }

            renderMenu(links);
            return;
        }

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

    if (menu) {
        sessionP.textContent = "Ingen bruker er logget inn.";
        renderMenu([
            { href: "index.html", label: "Forside" },
            { href: "register.html", label: "Registrer" },
            { href: "login.html", label: "Logg inn" }
        ]);
        return;
    }

    sessionP.innerHTML = `
        <a href="index.html">Forside</a>
        <a href="register.html">Registrer</a>
        <a href="login.html">Logg inn</a>
    `;
}

window.checkSession = checkSession;
checkSession();
