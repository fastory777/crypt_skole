const reg = document.getElementById("register");

reg.addEventListener("submit", async function (e) {
    e.preventDefault();
    const un = document.getElementById("userName").value;
    const p = document.getElementById("password").value;
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
});