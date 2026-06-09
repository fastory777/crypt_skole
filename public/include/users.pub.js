async function isNotAdmin() {
    const { checkAdmin } = await import("./tools.pub.js");

    if (!(await checkAdmin())) {
        window.location.replace("index.html");
        return true;
    }

    return false;
}

async function userList() {
    const listP = document.getElementById("userList");
    const res = await fetch("/api/users");
    const data = await res.json();

    if (!res.ok) {
        listP.textContent = data.message || "Could not load users";
        return;
    }

    const table = document.createElement("table");
    table.className = "users-table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Admin</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    for (const user of data.result) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.idUser}</td>
            <td></td>
            <td>${user.is_admin ? "Yes" : "No"}</td>
        `;
        row.children[1].textContent = user.userName;
        tbody.appendChild(row);
    }

    listP.replaceChildren(table);
}

async function initUsersPage() {
    if (await isNotAdmin()) {
        return;
    }

    await userList();
}

initUsersPage();
