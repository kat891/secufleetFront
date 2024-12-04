document.addEventListener('DOMContentLoaded', () => {
    fetchFleetQuotations();
});

function fetchFleetQuotations() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        console.error('No token found in localStorage');
        // Handle case where token is not available, e.g., redirect to login
        return;
    }

    fetch('http://localhost:3000/api/fleetQuotations', {
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
        const tableBody = document.getElementById('fleet-quotations-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        data.forEach(quotation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${quotation.email}</td>
                <td>${quotation.phoneNumber}</td>
                <td>${quotation.companyName}</td>
                <td>${quotation.type}</td>
                <td>${quotation.vehicles}</td>
                <td>${quotation.features}</td>
                <td>${quotation.status}</td>
                <td>
                    ${getActionButton(quotation)}
                    <button type="button" class="btn btn-danger" onclick="deleteFleetQuotation('${quotation._id}')">Delete</button>
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
            <button type="button" class="btn btn-light" onclick="updateFleetStatus('${quotation._id}', 'responded')">Mark as Responded</button>
        `;
    }
}

function updateFleetStatus(id, status) {
    const token = localStorage.getItem('jwtToken'); // Assuming you have stored the JWT token correctly

    fetch(`http://localhost:3000/api/fleetQuotations/${id}`, {
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
        fetchFleetQuotations(); // Refresh the list
    })
    .catch(error => console.error('Error updating status:', error));
}

function deleteFleetQuotation(id) {
    const token = localStorage.getItem('jwtToken'); // Assuming you have stored the JWT token correctly

    fetch(`http://localhost:3000/api/fleetQuotations/${id}`, {
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
        fetchFleetQuotations(); // Refresh the list
        alert("Quotation deleted successfully")
    })
    .catch(error => console.error('Error deleting quotation:', error));
}
