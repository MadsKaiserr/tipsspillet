import cookie from 'js-cookie'
import jwtDecode from "jwt-decode";
module.exports = {
    getUser: function() {
        if (cookie.get("auth")) {
            const authToken = JSON.parse(cookie.get("auth")).auth_token;
            const decodedToken = jwtDecode(authToken);
            const todayTime = new Date().getTime();
            const todayMS = todayTime/1000;
            if (decodedToken["exp"] > todayMS) {
                return decodedToken;
            } else {
                localStorage.clear();
                sessionStorage.clear();
                cookie.remove("activeGame");
                cookie.remove("email");
                cookie.remove("auth");
                window.open("/", "_self")
            }
        } else return undefined;
    },
    getToken: function() {
        return JSON.parse(JSON.stringify(getUser())).token;
    },

    setUserSession: function(user, token) {
        user.auth_token = token;
        cookie.set("email", user.email, {expires: 24});
        cookie.set("auth", JSON.stringify(user), {expires: 24});
        localStorage.removeItem("favoritter");
        localStorage.removeItem("aktive-spil-suspend");
    },

    resetUserSession: function() {
        localStorage.clear();
        sessionStorage.clear();
        cookie.remove("activeGame");
        cookie.remove("email");
        cookie.remove("auth");
    }
}