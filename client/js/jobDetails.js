document.addEventListener('DOMContentLoaded', () => {
    const applicationForm = document.getElementById('application-form');
    const jobDetailsElement = document.getElementById('job-details');
    const jobTitleElement = document.getElementById('job-title');

    // Get the job ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    // Fetch job details from the backend
    fetch(`http://localhost:3000/api/jobListing/${jobId}`)
        .then(response => response.json())
        .then(job => {
            populateJobDetails(job);
            // Set the job title in the form (optional)
            if (jobTitleElement && job.jobTitle) {
                jobTitleElement.textContent = `Apply for ${job.jobTitle}`;
            }
        })
        .catch(error => {
            console.error('Error fetching job details:', error);
        });

    function populateJobDetails(job) {
        const jobDetailsHtml = `
            <h2 class="text-3xl font-bold mb-4">${job.jobTitle}</h2>
            <div class="mb-4">
                <h3 class="text-xl font-semibold">Description</h3>
                <p class="text-lg">${job.description}</p>
            </div>
            <div class="mb-4">
                <h3 class="text-xl font-semibold">Requirements</h3>
                <p class="text-lg">${job.requirements}</p>
            </div>
            <div class="mb-4">
                <h3 class="text-xl font-semibold">Skills</h3>
                <p class="text-lg">${job.skills.join(', ')}</p>
            </div>
            <div class="flex justify-between items-center mb-8">
                <div>
                    <div class="text-lg font-bold">$${job.salary}</div>
                    <div class="text-gray-600 dark:text-gray-400">/Year</div>
                </div>
            </div>
        `;
        jobDetailsElement.innerHTML = jobDetailsHtml;
    }

    // Handle form submission
    applicationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(applicationForm);
        formData.append('jobTitle', jobTitleElement.textContent.replace('Apply for ', ''));

        fetch('http://localhost:3000/api/apply', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Application submitted successfully');
            } else {
                alert('Failed to submit application. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the application.');
        });
    });
});
