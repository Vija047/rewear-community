// Test script to verify API connectivity
console.log('Testing API connectivity...');

const API_BASE_URL = 'http://localhost:5000/api';

// Test health endpoint
fetch(`${API_BASE_URL}/../health`)
    .then(response => response.json())
    .then(data => {
        console.log('Backend health check:', data);
    })
    .catch(error => {
        console.error('Backend health check failed:', error);
    });

// Test items endpoint
fetch(`${API_BASE_URL}/items`)
    .then(response => response.json())
    .then(data => {
        console.log('Items endpoint response:', data);
    })
    .catch(error => {
        console.error('Items endpoint failed:', error);
    });

console.log('API connectivity tests initiated');
