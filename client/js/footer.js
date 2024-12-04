// navbar.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('/client/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});
