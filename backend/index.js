// Import the packages we just installed
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // This will load our .env file later

// Create an instance of an express application
const app = express();

// Define the "port" our server will run on. 5000 is common for backends.
const PORT = process.env.PORT || 5000;

// === Middleware ===
// These are "plugins" that run on every request
app.use(cors()); // Allows cross-origin requests (from our React app)
app.use(express.json()); // Allows our server to understand JSON data

// === Routes ===
// This is a "route" or "endpoint". It's a URL our server will respond to.
// When someone visits our server's main URL, send this response.
app.get('/', (req, res) => {
  res.send('Resume Builder API is running!');
});

// This is the main endpoint we will use later.
// It's a "POST" request because we will be *sending* data (the user's details) to it.
app.post('/api/generate-resume', (req, res) => {
  // For now, we'll just log the data we receive from the frontend
  console.log('Received data:', req.body);

  // And send a simple "dummy" response back
  res.json({
    message: 'Data received successfully!',
    dummyData: req.body 
  });
});

// === Start the Server ===
// This tells our server to "listen" for requests on the port we defined.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});