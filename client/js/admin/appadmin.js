document.addEventListener('DOMContentLoaded', () => {
    fetchAppDevQuotations();
});

function fetchAppDevQuotations() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        console.error('No token found in localStorage');
        // Handle case where token is not available, e.g., redirect to login
        return;
    }

    fetch('http://localhost:3000/api/quotations/app/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('appdev-quotations-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        data.forEach(quotation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${quotation.email}</td>
                <td>${quotation.phone}</td>
                <td>${quotation.company}</td>
                <td>${quotation.appType}</td>
                <td>${quotation.platforms.join(', ')}</td>
                <td>${quotation.features.join(', ')}</td>
                <td>${quotation.designBranding}</td>
                <td>${quotation.budgetTimeline}</td>
                <td>${quotation.status}</td>
                <td>
                    ${getActionButton(quotation)}
                    <button type="button" class="btn btn-danger" onclick="deleteAppDevQuotation('${quotation._id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching quotations:', error));
}

function getActionButton(quotation) {
    if (quotation.status === 'responded') {
        return `<button type="button" class="btn btn-outline-success">Success</button>`;
    } else {
        return `
            <button type="button" class="btn btn-light" onclick="updateAppDevStatus('${quotation._id}', 'responded')">Mark as Responded</button>
        `;
    }
}

function updateAppDevStatus(id, status) {
    const token = localStorage.getItem('jwtToken'); // Assuming you have stored the JWT token correctly

    fetch(`http://localhost:3000/api/quotations/app/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Status updated successfully:', data);
        fetchAppDevQuotations(); // Refresh the list
    })
    .catch(error => console.error('Error updating status:', error));
}

function deleteAppDevQuotation(id) {
    const token = localStorage.getItem('jwtToken'); // Assuming you have stored the JWT token correctly

    fetch(`http://localhost:3000/api/quotations/app/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Quotation deleted successfully:', data);
        fetchAppDevQuotations(); // Refresh the list
        alert("Quotation deleted successfully")
    })
    .catch(error => console.error('Error deleting quotation:', error));
}
