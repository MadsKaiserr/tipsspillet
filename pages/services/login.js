module.exports = {
    showLogin: function() {
        const popup = document.getElementById("login-container");
        popup.classList.add("block");

        document.body.style.overflow = 'hidden';
    },
    remLogin: function() {
        const popup = document.getElementById("login-container");
        popup.classList.remove("block");

        document.body.style.overflow = 'auto';
    }
}