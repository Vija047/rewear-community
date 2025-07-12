const express = require('express');
const app = express();
const PORT = 5001;

console.log('Starting test server...');

app.get('/', (req, res) => {
    console.log('Root endpoint hit');
    res.json({ message: 'Test server running' });
});

app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});

console.log('Test server script completed');
