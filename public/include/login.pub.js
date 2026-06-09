const login = document.getElementById("login");
const result = document.getElementById("result");

login.addEventListener("submit", async function (e) {
    e.preventDefault();
    const un = document.getElementById("userName").value;
    const p = document.getElementById("password").value;
    const res = await fetch("/api/login", {
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
    // console.log(data);

    if (res.ok && data.status === "success") {
        result.textContent = `Du ${data.userName} er logget inn med bruker-ID: ${data.idUser}.`;
        login.reset();
    } else {
        result.textContent = "Login feilet. Prøv igjen.";
    }

    if (typeof window.checkSession === "function") {
        window.checkSession();
    }
});
