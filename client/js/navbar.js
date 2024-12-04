
document.addEventListener('DOMContentLoaded', () => {
    fetch('/client/navbar.html') 
    .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
       
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    const overlay = document.getElementById('overlay');
    const closeOverlay = document.getElementById('closeOverlay');
    
    const aboutLink = document.getElementById('aboutLink');
    const productsLink = document.getElementById('productsLink');
    const servicesLink = document.getElementById('servicesLink');
    const industriesLink = document.getElementById('industriesLink');
    
    const aboutDropdownContent = document.getElementById('aboutDropdownContent');
    const productsDropdownContent = document.getElementById('productsDropdownContent');
    const servicesDropdownContent = document.getElementById('servicesDropdownContent');
    const industriesDropdownContent = document.getElementById('industriesDropdownContent');
    
    function setActiveLink(link) {
    removeActiveLink();
    link.classList.add('active');
    const arrow = link.querySelector('.arrow');
    if (arrow) {
        arrow.classList.add('up');
    }
    }
    
    function removeActiveLink() {
    const links = document.querySelectorAll('.navbar-menu a');
    links.forEach(link => {
        link.classList.remove('active');
        const arrow = link.querySelector('.arrow');
        if (arrow) {
            arrow.classList.remove('up');
        }
    });
    }
    hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
    });
    
    closeOverlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    aboutDropdownContent.style.display = 'none';
    productsDropdownContent.style.display = 'none';
    servicesDropdownContent.style.display = 'none';
    industriesDropdownContent.style.display = 'none';
    removeActiveLink()
    });
    closeSidebar.addEventListener('click', () => {
    overlay.style.display = 'none';
    navbarMenu.classList.remove('open');
    // hideAllDropdownContents();
    removeActiveLink()
    });
    aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOverlayContent(aboutDropdownContent);
    setActiveLink(aboutLink);
    });
    
    productsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOverlayContent(productsDropdownContent);
    setActiveLink(productsLink);
    });
    
    servicesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOverlayContent(servicesDropdownContent);
    setActiveLink(servicesLink);
    });
    
    industriesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOverlayContent(industriesDropdownContent);
    setActiveLink(industriesLink);
    });
    
    function showOverlayContent(content) {
    overlay.style.display = 'flex';
    aboutDropdownContent.style.display = 'none';
    productsDropdownContent.style.display = 'none';
    servicesDropdownContent.style.display = 'none';
    industriesDropdownContent.style.display = 'none';
    content.style.display = 'flex';
    }
    });
})