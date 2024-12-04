let sections = ['security', 'ecosystem', 'workflow', 'visibility'];
let currentIndex = 0;
let interval;

function changeContent(section) {
    const image = document.getElementById('image');
    const text = document.getElementById('text');
    const screenWidth=window.screen.width;
    console.log(screenWidth);
    
    const content = document.getElementById('content');

    if(screenWidth>=768){

    
    content.classList.remove('bounce-in-right');
    

    void content.offsetWidth;

   
    content.classList.add('bounce-in-right');
    document.querySelectorAll('.navbarabout a').forEach(link => {
        link.classList.remove('active1');
    });
}
    let activeLink;
    switch (section) {
        case 'security':    
            image.src = '/client/images/aboutSlider/distracted.jpg';
            image.style.borderRadius='15px';
            image.style.width='35%';
            image.style.height='35%';
            text.innerHTML = `
            Utilizes AI to enhance fleet security, detecting threats and ensuring safety. Continuously monitors data to prevent breaches and respond to incidents.    
            <br> 
                <span class="icon-text"><i class="bi bi-shield-lock"></i>Proactive threat detection</span>
                <span class="icon-text"><i class="bi bi-camera-video"></i>Automated incident response</span>
                <span class="icon-text"><i class="bi bi-alarm"></i>Improved data analysis</span>
            `;
            activeLink = document.getElementById('security-link');
            currentIndex = 0;
            break;
        case 'ecosystem':
            image.src = '/client/images/aboutSlider/track.png';
            image.style.borderRadius='15px';
            image.style.width='35%';
            image.style.height='35%';
            text.innerHTML = `
                Integrates various components of the fleet management system for seamless communication and data exchange, optimizing operations.
                <br>
                <span class="icon-text"><i class="bi bi-globe"></i>Integrated systems</span>
                <span class="icon-text"><i class="bi bi-graph-up"></i>Scalability</span>
                <span class="icon-text"><i class="bi bi-person-lines-fill"></i>Streamlined communication</span>
            `;
            activeLink = document.getElementById('ecosystem-link');
            currentIndex = 1;
            break;  
        case 'workflow':
            image.src = '/client/images/aboutSlider/truckFleetC.png';
            image.style.borderRadius='15px';
            image.style.width='35%';
            image.style.height='35%';
            text.innerHTML = `
            Automates tasks and provides comprehensive reporting, optimizing daily operations and tracking performance metrics.    
            <br>
                <span class="icon-text"><i class="bi bi-diagram-3"></i> Workflow automation</span>
                <span class="icon-text"><i class="bi bi-bar-chart"></i>Performance tracking</span>
                <span class="icon-text"><i class="bi bi-gear"></i>Comprehensive reports</span>
            `;
            activeLink = document.getElementById('workflow-link');
            currentIndex = 2;
            break;
        case 'visibility':
            image.src = '/client/images/aboutSlider/Fleet-Management.jpg';
            image.style.width='35%';
            image.style.height='35%';
            image.style.borderRadius='15px';
            text.innerHTML = `
                Offers constant monitoring of the fleet, allowing real-time tracking of vehicles and assets for better operational control.
                <br>
                <span class="icon-text"><i class="bi bi-eye"></i>Enhanced control</span>
                <span class="icon-text"><i class="bi bi-map"></i>Improved decision-making</span>
                <span class="icon-text"><i class="bi bi-wifi"></i>Live tracking</span>
            `;
            activeLink = document.getElementById('visibility-link');
            currentIndex = 3;
            break;
        default:
            image.src = '/client/images/aboutSlider/distracted.jpg';
            image.style.borderRadius='15px';
            image.style.width='35%';
            image.style.height='35%';
            text.innerHTML = `
                Use AI-powered video technology to protect your most important assets, your employees. Capture and manage security risks in real time across your operations.
                <br>
                <span class="icon-text"><i class="bi bi-shield-lock"></i> Security feature</span>
                <span class="icon-text"><i class="bi bi-camera-video"></i> Video surveillance</span>
                <span class="icon-text"><i class="bi bi-alarm"></i> Real-time alerts</span>
            `;
            activeLink = document.getElementById('security-link');
            currentIndex = 0;
    }
    if (!activeLink) {
        console.error('activeLink is null. Make sure the ID exists in the DOM.');
        return;
    }
    activeLink.classList.add('active1');

    // Adjust progress bar width and position
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
        console.error("progressBar is null, cannot adjust progress.");
        return;
    }
    const container = document.querySelector('.navbarabout');
    if (!container) {
        console.error("Navbarabout container is null, cannot getBoundingClientRect.");
        return;
    }
    const rect = activeLink.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const width = rect.width;
    const left = rect.left - containerRect.left;

    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    progressBar.style.left = `${left}px`;
    
    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = `${width}px`;
    }, 50);

    clearInterval(interval);
    interval = setInterval(autoChangeContent, 5000);
}

function autoChangeContent() {
    currentIndex = (currentIndex + 1) % sections.length;
    changeContent(sections[currentIndex]);
}

interval = setInterval(autoChangeContent, 5000);

changeContent('security');