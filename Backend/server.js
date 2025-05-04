import http from 'http';
import app from './app.js';
// import { initializeSocket } from './socket';
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});