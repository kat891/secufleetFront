document.getElementById('jobListingForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const jobTitle = document.getElementById('jobTitle').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const requirements = document.getElementById('requirements').value;
    const salary = parseInt(document.getElementById('salary').value);
    const company = document.getElementById('company').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());

    const token = localStorage.getItem('jwtToken'); // Adjust as per your storage method

    const formData = {
        jobTitle,
        description,
        location,
        requirements,
        salary,
        company,
        skills
    };

    fetch('http://localhost:3000/api/jobListing/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Job listing submitted successfully:', data);
        alert('Job listing submitted successfully!');
        // Optionally redirect to another page or clear form fields
        // window.location.href = '/thank-you-page.html';
        // document.getElementById('jobListingForm').reset();
    })
    .catch(error => {
        console.error('Error submitting job listing:', error);
        alert('Failed to submit job listing. Please try again.');
    });
});
