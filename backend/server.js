// ==============================================================================
// Akash Photography - Lightweight Node.js API Server (Zero Dependencies)
// Run this when PHP is not yet installed on your Windows machine:
// node backend/server.js
// ==============================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const DATA_FILE = path.join(__dirname, 'inquiries.json');

// Ensure data store exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url.split('?')[0];

  // 1. POST /api/inquiry.php
  if ((url === '/api/inquiry.php' || url === '/api/inquiry') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');

        // Validation
        if (!data.name || !data.email || !data.phone) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Name, Email, and Phone are required.' }));
          return;
        }

        const inquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
        const newId = inquiries.length + 1;
        const record = {
          id: newId,
          ...data,
          created_at: new Date().toISOString()
        };

        inquiries.push(record);
        fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));

        console.log(`[API] Saved Inquiry #${newId} from ${data.name} (${data.eventType || 'Event'})`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          inquiry_id: newId,
          message: 'Inquiry received successfully! Our team will contact you within 24 hours.'
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Server error processing inquiry.' }));
      }
    });
    return;
  }

  // 2. GET /api/inquiries.php (Admin list)
  if ((url === '/api/inquiries.php' || url === '/api/inquiries') && req.method === 'GET') {
    const inquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: inquiries.length, data: inquiries }));
    return;
  }

  // 3. Fallback Healthcheck
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'Akash Photography API is online',
    php_backend_folder: 'backend/api/',
    node_dev_server: 'Running on port ' + PORT
  }));
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`Akash Photography API Server running at:`);
  console.log(`http://localhost:${PORT}`);
  console.log(`Endpoint: POST http://localhost:${PORT}/api/inquiry.php`);
  console.log(`=======================================================`);
});
