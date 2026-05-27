export async function checkAdmin() {
    const res = await fetch("/api/admin");
    const data = await res.json();
    if (data.isAdmin) {
        return true;
    } else {
        return false;
    }
}