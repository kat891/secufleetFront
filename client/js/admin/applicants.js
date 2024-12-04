document.addEventListener('DOMContentLoaded', () => {
    const applicantsContainer = document.getElementById('applicants-container');
    const token = localStorage.getItem('jwtToken');
    fetch('http://localhost:3000/api/applicants',{
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            displayApplicants(data);
        })
        .catch(error => {
            console.error('Error fetching applicants:', error);
        });

    function displayApplicants(applicants) {
        applicants.forEach(jobGroup => {
            const jobSection = document.createElement('div');
            jobSection.classList.add('mb-6');

            const jobTitle = document.createElement('h3');
            jobTitle.classList.add('text-xl', 'font-semibold', 'mb-2');
            jobTitle.textContent = jobGroup._id;
            jobSection.appendChild(jobTitle);

            const applicantCount = document.createElement('p');
            applicantCount.classList.add('text-gray-600', 'dark:text-gray-400');
            applicantCount.textContent = `Number of Applicants: ${jobGroup.applicants.length}`;
            jobSection.appendChild(applicantCount);

            const applicantList = document.createElement('ul');
            applicantList.classList.add('space-y-4');

            jobGroup.applicants.forEach(applicant => {
                const applicantItem = document.createElement('li');
                applicantItem.classList.add('p-4', 'bg-gray-100', 'dark:bg-gray-700', 'rounded-lg');

                const applicantDetails = `
                    <p><strong>Name:</strong> ${applicant.firstName} ${applicant.lastName}</p>
                    <p><strong>Email:</strong> ${applicant.email}</p>
                    <p><strong>Phone:</strong> ${applicant.phone}</p>
                    <p><strong>CV:</strong> <a href="/${applicant.cv}" target="_blank" class="text-blue-600">Download CV</a></p>
                    <p><strong>Applied At:</strong> ${new Date(applicant.appliedAt).toLocaleString()}</p>
                `;

                applicantItem.innerHTML = applicantDetails;
                applicantList.appendChild(applicantItem);
            });

            jobSection.appendChild(applicantList);
            applicantsContainer.appendChild(jobSection);
        });
    }
});
