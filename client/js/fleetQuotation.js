let totalFleetQuestions = 4; // Total number of questions
let currentFleetQuestion = 1; // Current question index
let count = 0;
let totalWebQuestions = 5;
let currentWebQuestion = 1;


let selectedAnswers = {
    type: '',
    logo: '',
    branding: '',
    pages: '',
    requirements: '',
};

document.getElementById('webdev-email').addEventListener('input', updateNextButtonStateWebdev);

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
        updateBackButtonState();
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
        updateBackButtonState();
    }
});

document.getElementById('webdev-question-container').addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('question-card')) {
        updateNextButtonStateWebdev(); // Call the function to update the next button state
    }
});

// document.getElementById('webdev-submit-btn').addEventListener('click', () => {
//     if (validateEmail('webdev-email', 'webdevEmailError')) {
//         submitFormWeb();
//     }
// });

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

function updateBackButtonState() {
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

updateWebProgressBar();
updateBackButtonState();
updateNextButtonStateWebdev();

document.getElementById('email').addEventListener('input', updateNextButtonState);
let fleetselectedAnswers = {
    type: '',
    vehicles: '',
    features: '',

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
        updateBackButtonState();
    }
});

document.getElementById('back-btn').addEventListener('click', () => {
    if (currentFleetQuestion > 1) {
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'none';
        currentFleetQuestion--;
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'block';
        updateFleetProgressBar();
        updateNextButtonState();
        updateBackButtonState();
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

function updateBackButtonState() {
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
            // Optionally show confirmation message or redirect
            document.getElementById('fleet-question-container').style.display = 'none';
            document.getElementById('confirmation-section').style.display = 'block';
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
        fleetselectedAnswers.features = card.getAttribute('data-answer');
        console.log('Selected Pages:', fleetselectedAnswers.features);
    });
});


// Initial call to set progress and button state
updateFleetProgressBar();
updateNextButtonState();
updateBackButtonState();
