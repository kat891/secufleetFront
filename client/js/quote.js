let totalFleetQuestions = 4; // Total number of questions
let currentFleetQuestion = 1; // Current question index
let count = 0;
/////////////////////
let totalWebQuestions = 5;
let currentWebQuestion = 1;
/////////////////////
let totalAppQuestions=6;
let currentAppQuestions=1;
///////////////////////
let totalConsltQuestions=6;
let currentConsltQuestion=1;

let ConsltselectedAnswers = {
    type: '',
    challenges: '',
    support: '',
    team: '',
    timeline: '',
}

let selectedAnswers = {
    type: '',
    logo: '',
    branding: '',
    pages: '',
    requirements: '',
};

document.getElementById('webdev-email').addEventListener('input', updateNextButtonStateWebdev);

 document.getElementById('appdev-email').addEventListener('input', updateNextButtonStateAppdev);

document.getElementById('consulting-email').addEventListener('input', updateNextButtonStateConsulting);

function validateEmail(emailInputId, errorId) {
    const emailInput = document.getElementById(emailInputId);
    const emailError = document.getElementById(errorId);
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailPattern.test(email)) {
        emailError.style.display = 'none';
        return true;
    } else {
        emailError.style.display = 'block';
        return false;
    }
}

document.querySelectorAll('.web-question-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        card.classList.add('bounce-top');
        updateNextButtonStateWebdev();
        setTimeout(() => {
            card.classList.remove('bounce-top');
        }, 1000);
    });
});

document.getElementById('webdev-next-btn').addEventListener('click', () => {
    if (currentWebQuestion < totalWebQuestions) {
        document.getElementById(`webdev-question-${currentWebQuestion}`).style.display = 'none';
        currentWebQuestion++;
        document.getElementById(`webdev-question-${currentWebQuestion}`).style.display = 'block';
        updateWebProgressBar();
        updateNextButtonStateWebdev();
        updateWebBackButtonState();
    } 
    // else {
    //     submitFormWeb(); // Submit the form if it's the last question
    // }
});

document.getElementById('webdev-back-btn').addEventListener('click', () => {
    if (currentWebQuestion > 1) {
        document.getElementById(`webdev-question-${currentWebQuestion}`).style.display = 'none';
        currentWebQuestion--;
        document.getElementById(`webdev-question-${currentWebQuestion}`).style.display = 'block';
        updateWebProgressBar();
        updateNextButtonStateWebdev();
        updateWebBackButtonState();
    }
});

document.getElementById('webdev-question-container').addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('question-card')) {
        updateNextButtonStateWebdev(); // Call the function to update the next button state
    }
});



function updateNextButtonStateWebdev() {
    let currentQuestionElement = document.getElementById(`webdev-question-${currentWebQuestion}`);
    let selectedCards = currentQuestionElement.querySelectorAll('.question-card.selected').length;

    // Check if it's the last question in the webdev section
    if (currentWebQuestion === totalWebQuestions) { // Assuming the last question index is 6
        let emailInput = document.getElementById('webdev-email').value.trim();
        document.getElementById('webdev-next-btn').style.display = 'none';
        document.getElementById('webdev-submit-btn').disabled = emailInput === '';
        document.getElementById('webdev-submit-btn').style.display = emailInput === '' ? 'none' : '';
    } else {
        document.getElementById('webdev-next-btn').disabled = selectedCards === 0;
        document.getElementById('webdev-submit-btn').style.display = 'none';
    }
}

function updateWebProgressBar() {
    let progressPercentage = ((currentWebQuestion-1 ) / totalWebQuestions) * 100;
    document.getElementById('webprogress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('webprogress-text').innerText = `${Math.round(progressPercentage)}%`;
}

function updateWebBackButtonState() {
    const webdevBackButton = document.getElementById('webdev-back-btn');
    
    webdevBackButton.disabled = currentWebQuestion === 1;
    if (currentWebQuestion > 1) {
        webdevBackButton.classList.add('enabled');
    } else {
        webdevBackButton.classList.remove('enabled');
    }
}

function submitFormWeb() {
    if (validateEmail('webdev-email', 'webdevEmailError')) {
        const email = document.getElementById('webdev-email').value.trim();
        const phone = document.getElementById('webdev-phone').value.trim();
        const company = document.getElementById('webdev-company').value.trim();
        const requirements = selectedAnswers.requirements;

        const payload = {
            email: email,
            phone: phone,
            company: company,
            type: selectedAnswers.type,
            logo: selectedAnswers.logo,
            branding: selectedAnswers.branding,
            pages: 5,
            requirements: requirements
        };

        fetch('http://localhost:3000/api/quotations/web', {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Quotation submitted successfully:', data);
            // Optionally show confirmation message or redirect
            document.getElementById('webdev-question-container').style.display = 'none';
            document.getElementById('Webconfirmation-section').style.display = 'block';
            document.getElementById('Webbuttons').style.display = 'none';
        })
        .catch(error => {
            console.error('Error submitting quotation:', error);
            // Handle error: display message to user, retry, etc.
        });
    } else {
        document.getElementById('webdevEmailError').style.display = 'block';
        console.log("Email error");
    }
}

function redirect() {
    window.location.href = '../index.html';
}

function showWebQuestions(service) {
    console.log("web clicked");
    document.getElementById('service-container').classList.add('hidden'); // Hide the service options
    document.getElementById(service).classList.remove('hidden'); // Show the selected service section
   
    document.getElementById(`webdev-question-${currentWebQuestion}`).style.display = 'block'; // Show the first question of WebDev
}

document.querySelectorAll('#webdev-question-1 .web-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.type = card.getAttribute('data-answer');
        console.log('Selected Type:', selectedAnswers.type);
    });
});

document.querySelectorAll('#webdev-question-2 .web-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.logo = card.getAttribute('data-answer');
        console.log('Selected Logo:', selectedAnswers.logo);
    });
});

document.querySelectorAll('#webdev-question-3 .web-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.pages = card.getAttribute('data-answer');
        console.log('Selected Pages:', selectedAnswers.pages);
    });
});

document.querySelectorAll('#webdev-question-4 .web-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.requirements = card.getAttribute('data-answer');
        console.log('Selected Requirements:', selectedAnswers.requirements);
    });
});

document.querySelectorAll('#brandingSelection .web-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.branding = card.getAttribute('data-answer');
        console.log('Selected Branding:', selectedAnswers.branding);
    });
});
///////////////////////////////////////////////////////////////////////////////////
//                                      Fleet
//////////////////////////////////////////////////////////////////////////////////

document.getElementById('email').addEventListener('input', updateNextButtonState);
let fleetselectedAnswers = {
    type: '',
    vehicles: '',
    features:[],

};

function validateEmail(emailInputId, errorId) {
    const emailInput = document.getElementById(emailInputId);
    const emailError = document.getElementById(errorId);
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailPattern.test(email)) {
        emailError.style.display = 'none';
        return true;
    } else {
        emailError.style.display = 'block';
        return false;
    }
}
document.querySelectorAll('.fleet-question-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        card.classList.add('bounce-top');
        updateNextButtonState();
        setTimeout(() => {
            card.classList.remove('bounce-top'); 
        }, 1000);
    });
});


document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateNextButtonState();
    });
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentFleetQuestion < totalFleetQuestions) {
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'none';
        currentFleetQuestion++;
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'block';
        updateFleetProgressBar();
        updateNextButtonState();
        updateFleetBackButtonState();
    }
});

document.getElementById('back-btn').addEventListener('click', () => {
    if (currentFleetQuestion > 1) {
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'none';
        currentFleetQuestion--;
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'block';
        updateFleetProgressBar();
        updateNextButtonState();
        updateFleetBackButtonState();
    }
});

function updateNextButtonState() {
    if (currentFleetQuestion === totalFleetQuestions) { // Check if it's the email question
        let emailInput = document.getElementById('email').value.trim();
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').disabled = emailInput === '';
        document.getElementById('submit-btn').style.display = '';
    } else {
        let selectedCards = document.querySelectorAll(`#question-${currentFleetQuestion} .question-card.selected`).length;
        let selectedRadio = document.querySelectorAll(`#question-${currentFleetQuestion} input[type="radio"]:checked`).length;
        document.getElementById('next-btn').disabled = selectedCards === 0 && selectedRadio === 0;
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function updateFleetProgressBar() {
    let progressPercentage = ((currentFleetQuestion - 1) / totalFleetQuestions) * 100;
    document.getElementById('fleetprogress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('fleetprogress-text').innerText = `${Math.round(progressPercentage)}%`;
}

function updateFleetBackButtonState() {
    const backButton = document.getElementById('back-btn');

    backButton.disabled = currentFleetQuestion === 1;
    if (currentFleetQuestion > 1 ) {
        backButton.classList.add('enabled');

    } else {
        backButton.classList.remove('enabled');

    }
}

function fleetsubmitForm() {
    if (validateEmail('email', 'EmailError')) {
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('fleetphone').value.trim();
        const company = document.getElementById('fleetcompany').value.trim();

        const payload = {
            email: email,
            phoneNumber: phone,
            companyName: company,
            type:fleetselectedAnswers.type ,
            vehicles: fleetselectedAnswers.vehicles,
            features: fleetselectedAnswers.features,
        };
        console.log(payload);
        // const payload = {
        //     email: email,
        //     phoneNumber: phone,
        //     companyName: company,
        //     type: "cars",
        //     vehicles: "11-50",
        //     features: "gps",
        // };


        fetch('http://localhost:3000/api/fleetQuotations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Quotation submitted successfully:', data);
            document.getElementById('fleet-question-container').style.display = 'none';
            document.getElementById('confirmation-section').style.display = 'block';
            document.getElementById('fleetbuttons').style.display = 'none';
        })
        .catch(error => {
            console.error('Error submitting quotation:', error);
            // Handle error: display message to user, retry, etc.
        });
    } else {
        document.getElementById('EmailError').style.display = 'block';
        console.log("Email error");
    }
}

function redirect() {
    window.location.href = '../index.html';
}

function showFleetQuestions(service) {
    console.log("fleet clicked");
  document.getElementById('service-container').classList.add('hidden'); // Hide the service options
    document.getElementById(service).classList.remove('hidden'); // Show the selected service section
   document.getElementById(`question-${currentFleetQuestion}`).style.display = 'block'; // Show the first question of Fleet

}
document.querySelectorAll('#question-1 .fleet-question-card').forEach(card => {
    card.addEventListener('click', function() {
        fleetselectedAnswers.type = card.getAttribute('data-answer');
        console.log('Selected Type:', fleetselectedAnswers.type);
    });
});

document.querySelectorAll('#question-2 input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Check if the radio button is checked
        if (this.checked) {
            // Get the value of the checked radio button
            let selectedValue = this.value;
            
            // Example: If you want to store the selected value in an object
            fleetselectedAnswers.vehicles = selectedValue;
            
            // Example: If you want to log the selected value to the console
            console.log('Selected Vehicles:', fleetselectedAnswers.vehicles);
        }
    });
});

document.querySelectorAll('#question-3 .fleet-question-card').forEach(card => {
    card.addEventListener('click', function() {
        // Get the current data-answer value
        let selectedFeature = card.getAttribute('data-answer');

        // Toggle selection: if already selected, remove; otherwise, add
        if (fleetselectedAnswers.features.includes(selectedFeature)) {
            // Remove from array
            fleetselectedAnswers.features = fleetselectedAnswers.features.filter(item => item !== selectedFeature);
        } else {
            // Add to array
            fleetselectedAnswers.features.push(selectedFeature);
        }

        // Log the selected features array
        console.log('Selected Features:', fleetselectedAnswers.features);
    });
});

/////////////////////////////////////////////////////////////////////////
//                          APP
//////////////////////////////////////////////////////////////////////////
function showAppQuestions(service) {
    console.log("app clicked");
    document.getElementById('service-container').classList.add('hidden'); // Hide the service options
    document.getElementById(service).classList.remove('hidden'); // Show the selected service section
   
    document.getElementById(`appdev-question-${currentAppQuestions}`).style.display = 'block'; // Show the first question of WebDev
}


document.querySelectorAll('.app-question-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        card.classList.add('bounce-top');
        updateNextButtonStateAppdev();
        setTimeout(() => {
            card.classList.remove('bounce-top');
        }, 1000);
    });
});

document.getElementById('appdev-next-btn').addEventListener('click', () => {
    if (currentAppQuestions < totalAppQuestions) {
        document.getElementById(`appdev-question-${currentAppQuestions}`).style.display = 'none';
        currentAppQuestions++;
        document.getElementById(`appdev-question-${currentAppQuestions}`).style.display = 'block';
        updateAppProgressBar();
        updateNextButtonStateAppdev();
        updateAppBackButtonState();
    } 
    // else {
    //     submitFormWeb(); // Submit the form if it's the last question
    // }
});

document.getElementById('appdev-back-btn').addEventListener('click', () => {
    if (currentAppQuestions > 1) {
        document.getElementById(`appdev-question-${currentAppQuestions}`).style.display = 'none';
        currentAppQuestions--;
        document.getElementById(`appdev-question-${currentAppQuestions}`).style.display = 'block';
        updateAppProgressBar();
        updateNextButtonStateAppdev();
        updateAppBackButtonState();
    }
});

document.getElementById('appdev-question-container').addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('question-card')) {
        updateNextButtonStateAppdev(); 
    }
});


function updateNextButtonStateAppdev() {
    let currentQuestionElement = document.getElementById(`appdev-question-${currentAppQuestions}`);
    let selectedCards = currentQuestionElement.querySelectorAll('.question-card.selected').length;

    // Check if it's the last question in the webdev section
    if (currentAppQuestions === totalAppQuestions) {
        let emailInput = document.getElementById('appdev-email').value.trim();
        document.getElementById('appdev-next-btn').style.display = 'none';
        document.getElementById('appdev-submit-btn').disabled = emailInput === '';
        document.getElementById('appdev-submit-btn').style.display = emailInput === '' ? 'none' : '';
    } else {
        document.getElementById('appdev-next-btn').disabled = selectedCards === 0;
        document.getElementById('appdev-submit-btn').style.display = 'none';
    }
}

function updateAppProgressBar() {
    let progressPercentage = ((currentAppQuestions-1 ) / totalAppQuestions) * 100;
    document.getElementById('appprogress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('appprogress-text').innerText = `${Math.round(progressPercentage)}%`;
}

function updateAppBackButtonState() {
    const appdevBackButton = document.getElementById('appdev-back-btn');
    appdevBackButton.disabled = currentAppQuestions === 1;
    if (currentAppQuestions > 1) {
        appdevBackButton.classList.add('enabled');
    } else {
        appdevBackButton.classList.remove('enabled');
    }
}

// Frontend fetch function for submitting app development quotation

function submitFormApp() {
    if (validateEmail('appdev-email', 'appdevEmailError')) {
        const email = document.getElementById('appdev-email').value.trim();
        const phone = document.getElementById('appdev-phone').value.trim();
        const company = document.getElementById('appdev-company').value.trim();
        const appType = selectedAnswers.appType;
        const platforms = selectedAnswers.platforms;
        const features = selectedAnswers.features;
        const designBranding = selectedAnswers.designBranding;
        const budgetTimeline = selectedAnswers.budgetTimeline;

        const payload = {
            email: email,
            phone: phone,
            company: company,
            appType: appType,
            platforms: platforms,
            features: features,
            designBranding: designBranding,
            budgetTimeline: budgetTimeline
        };
        console.log(platforms);
        console.log(payload)
        fetch('http://localhost:3000/api/quotations/app', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Quotation submitted successfully:', data);
            // Optionally show confirmation message or redirect
            document.getElementById('appdev-question-container').style.display = 'none';
            document.getElementById('Appconfirmation-section').style.display = 'block';
            document.getElementById('Appbuttons').style.display = 'none';
            //Appbuttons
        })
        .catch(error => {
            console.error('Error submitting quotation:', error);
            // Handle error: display message to user, retry, etc.
        });
    } else {
        document.getElementById('appdevEmailError').style.display = 'block';
        console.log("Email error");
    }
}

// Event listeners for selecting answers

document.querySelectorAll('#appdev-question-1 .app-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.appType = card.getAttribute('data-answer');
        console.log('Selected App Type:', selectedAnswers.appType);
    });
});

document.querySelectorAll('#appdev-question-2 .app-question-card').forEach(card => {
    card.addEventListener('click', function() {
        const platform = card.getAttribute('data-answer');
        
        // Initialize selectedAnswers.platforms as an empty array if it's undefined
        if (!selectedAnswers.platforms) {
            selectedAnswers.platforms = [];
        }

        if (!selectedAnswers.platforms.includes(platform)) {
            selectedAnswers.platforms.push(platform);
        } else {
            selectedAnswers.platforms = selectedAnswers.platforms.filter(p => p !== platform);
        }
        console.log('Selected Platforms:', selectedAnswers.platforms);
    });
});


document.querySelectorAll('#appdev-question-3 .app-question-card').forEach(card => {
    card.addEventListener('click', function() {
        const feature = card.getAttribute('data-answer');
        
        // Initialize selectedAnswers.features as an empty array if it's undefined
        if (!selectedAnswers.features) {
            selectedAnswers.features = [];
        }

        if (!selectedAnswers.features.includes(feature)) {
            selectedAnswers.features.push(feature);
        } else {
            selectedAnswers.features = selectedAnswers.features.filter(f => f !== feature);
        }
        console.log('Selected Features:', selectedAnswers.features);
    });
});


document.querySelectorAll('#appdev-question-4 .app-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.designBranding = card.getAttribute('data-answer');
        console.log('Selected Design/Branding:', selectedAnswers.designBranding);
    });
});

document.querySelectorAll('#appdev-question-5 .app-question-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedAnswers.budgetTimeline = card.getAttribute('data-answer');
        console.log('Selected Budget/Timeline:', selectedAnswers.budgetTimeline);
    });
});
//////////////////////////////////////////////////////////////////////
/////////////////////////////////Consulting//////////////////////////
/////////////////////////////////////////////////////////////////////
function showConsultingQuestions(service) {
    console.log("Consulting Clicked");
    document.getElementById('service-container').classList.add('hidden'); // Hide the service options
    document.getElementById(service).classList.remove('hidden'); // Show the selected service section
   
    document.getElementById(`consulting-question-${currentConsltQuestion}`).style.display = 'block'; // Show the first question of Consulting
}

document.querySelectorAll('.consulting-question-card').forEach(card => {
    // console.log("Card found:", card); 
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        card.classList.add('bounce-top');
        updateNextButtonStateConsulting();
        setTimeout(() => {
            card.classList.remove('bounce-top');
        }, 1000);
    });
});

document.getElementById('consulting-next-btn').addEventListener('click', () => {
    if (currentConsltQuestion < totalConsltQuestions) {
        document.getElementById(`consulting-question-${currentConsltQuestion}`).style.display = 'none';
        currentConsltQuestion++;
        document.getElementById(`consulting-question-${currentConsltQuestion}`).style.display = 'block';
        updateConsultingProgressBar();
        updateNextButtonStateConsulting();
        updateConsultingBackButtonState();
    } 

});

document.getElementById('consulting-back-btn').addEventListener('click', () => {
    if (currentConsltQuestion > 1) {
        document.getElementById(`consulting-question-${currentConsltQuestion}`).style.display = 'none';
        currentConsltQuestion--;
        document.getElementById(`consulting-question-${currentConsltQuestion}`).style.display = 'block';
        updateConsultingProgressBar();
        updateNextButtonStateConsulting();
        updateConsultingBackButtonState();
    }
});

document.getElementById('consulting-question-container').addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('question-card')) {
        updateNextButtonStateConsulting(); // Call the function to update the next button state
    }
});



function updateNextButtonStateConsulting() {
    let currentQuestionElement = document.getElementById(`consulting-question-${currentConsltQuestion}`);
    let selectedCards = currentQuestionElement.querySelectorAll('.question-card.selected').length;

    // Check if it's the last question in the webdev section
    if (currentConsltQuestion === totalConsltQuestions) { // Assuming the last question index is 6
        let emailInput = document.getElementById('consulting-email').value.trim();
        document.getElementById('consulting-next-btn').style.display = 'none';
        document.getElementById('consulting-submit-btn').disabled = emailInput === '';
        document.getElementById('consulting-submit-btn').style.display = emailInput === '' ? 'none' : '';
    } else {
        document.getElementById('consulting-next-btn').disabled = selectedCards === 0;
        document.getElementById('consulting-submit-btn').style.display = 'none';
    }
}

function updateConsultingProgressBar() {
    let progressPercentage = ((currentConsltQuestion-1 ) / totalConsltQuestions) * 100;
    document.getElementById('consultingprogress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('consultingprogress-text').innerText = `${Math.round(progressPercentage)}%`;
}

function updateConsultingBackButtonState() {
    const consultingBackButton = document.getElementById('consulting-back-btn');
    
    consultingBackButton.disabled = currentConsltQuestion === 1;
    if (currentConsltQuestion > 1) {
        consultingBackButton.classList.add('enabled');
    } else {
        consultingBackButton.classList.remove('enabled');
    }
}

function submitFormConsulting() {
    if (validateEmail('consulting-email', 'consultingEmailError')) {
        const email = document.getElementById('consulting-email').value.trim();
        const phone = document.getElementById('consulting-phone').value.trim();
        const company = document.getElementById('consulting-company').value.trim();
        const type = ConsltselectedAnswers.type;
        const challenges = ConsltselectedAnswers.challenges;
        const support = ConsltselectedAnswers.support;
        const team = ConsltselectedAnswers.team;
        const timeline = ConsltselectedAnswers.timeline;

        const payload = {
            email: email,
            phone: phone,
            company: company,
            type: type,
            challenges: challenges,
            support: support,
            team: team,
            timeline: timeline
        };
        // console.log(platforms);
        console.log(payload)
        fetch('http://localhost:3000/api/consulting/create', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Quotation submitted successfully:', data);
            // Optionally show confirmation message or redirect
            document.getElementById('consulting-question-container').style.display = 'none';
            document.getElementById('consultingconfirmation-section').style.display = 'block';
            document.getElementById('consultingbuttons').style.display = 'none';
            //Appbuttons
        })
        .catch(error => {
            console.error('Error submitting quotation:', error);
            // Handle error: display message to user, retry, etc.
        });
    } else {
        document.getElementById('consultingEmailError').style.display = 'block';
        console.log("Email error");
    }
}

function redirect() {
    window.location.href = '../index.html';
}


document.querySelectorAll('#consulting-question-1 .consulting-question-card').forEach(card => {
    card.addEventListener('click', function() {
        ConsltselectedAnswers.type = card.getAttribute('data-answer');
        console.log('Selected Type:', ConsltselectedAnswers.type);
    });
});

document.querySelectorAll('#consulting-question-2 .consulting-question-card').forEach(card => {
    card.addEventListener('click', function() {
        ConsltselectedAnswers.challenges = card.getAttribute('data-answer');
        console.log('Selected challenges:', ConsltselectedAnswers.challenges);
    });
});

document.querySelectorAll('#consulting-question-3 .consulting-question-card').forEach(card => {
    card.addEventListener('click', function() {
        ConsltselectedAnswers.support = card.getAttribute('data-answer');
        console.log('Selected support:', ConsltselectedAnswers.support);
    });
});

document.querySelectorAll('#consulting-question-4 .consulting-question-card').forEach(card => {
    card.addEventListener('click', function() {
        ConsltselectedAnswers.team = card.getAttribute('data-answer');
        console.log('Selected team:', ConsltselectedAnswers.team);
    });
});

document.querySelectorAll('#consulting-question-5 .consulting-question-card').forEach(card => {
    card.addEventListener('click', function() {
        ConsltselectedAnswers.timeline = card.getAttribute('data-answer');
        console.log('Selected timeline:', ConsltselectedAnswers.timeline);
    });
});

// Initial call to set progress and button state
updateFleetProgressBar();
updateNextButtonState();
updateFleetBackButtonState();
////////////////////////
updateWebBackButtonState()
updateWebProgressBar();
updateNextButtonStateWebdev();
//////////////////////////
updateAppBackButtonState()
updateAppProgressBar();
updateNextButtonStateAppdev();
////////////////////////////
updateConsultingBackButtonState()
updateConsultingProgressBar();
updateNextButtonStateConsulting();