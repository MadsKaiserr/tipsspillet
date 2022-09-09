module.exports = {
    getUser: function() {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem("auth");
            if (user === "undefined" || !user) {
                return null
            } else {
                return JSON.parse(user);
            }
        }
    },
    getToken: function() {
        return JSON.parse(localStorage.getItem("auth")).token;
    },

    setUserSession: function(user, token) {
        user.auth_token = token;
        localStorage.setItem("auth", JSON.stringify(user));
        localStorage.setItem("email", user.email);
        localStorage.removeItem("favoritter");
        localStorage.removeItem("aktive-spil-suspend");
    },

    resetUserSession: function() {
        localStorage.clear();
        sessionStorage.clear();
    }
}