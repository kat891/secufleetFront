document.addEventListener('DOMContentLoaded', () => {
    fetchQuotations();
});

function fetchQuotations() {
    const token = localStorage.getItem('jwtToken');

    fetch('http://localhost:3000/api/webQuotations', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('quotations-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        data.forEach(quotation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${quotation.email}</td>
                <td>${quotation.phone}</td>
                <td>${quotation.company}</td>
                <td>${quotation.type}</td>
                <td>${quotation.logo}</td>
                <td>${quotation.pages}</td>
                <td>${quotation.requirements}</td>
                <td>${quotation.status}</td>
                <td>
                    ${getActionButton(quotation)}
                    <button type="button" class="btn btn-danger" onclick="deleteQuotation('${quotation._id}')">Delete</button>
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
            <button type="button" class="btn btn-info" onclick="updateStatus('${quotation._id}', 'responded')">Mark as Responded</button>
        `;
    }
}

function updateStatus(id, status) {
    const token = localStorage.getItem('jwtToken');

    fetch(`http://localhost:3000/api/webQuotations/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Status updated successfully:', data);
        fetchQuotations(); // Refresh the list
    })
    .catch(error => console.error('Error updating status:', error));
}

function deleteQuotation(id) {
    const token = localStorage.getItem('jwtToken');

    fetch(`http://localhost:3000/api/webQuotations/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert("deleted successfully");
        fetchQuotations(); // Refresh the list
        console.log('Quotation deleted successfully:', data);
    })
    .catch(error => console.error('Error deleting quotation:', error));
}
