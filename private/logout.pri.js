function logout(req) {
    return new Promise((resolve, reject) => {
        if (!req.session) {
            resolve({
                status: "success",
                message: "No active session",
                redirectTo: "/index.html"
            });
            return;
        }

        req.session.destroy((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                status: "success",
                message: "Logged out",
                redirectTo: "/index.html"
            });
        });
    });
}

module.exports = { logout };
