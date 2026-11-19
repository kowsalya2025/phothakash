// ==============================================================================
// Akash Photography - Lightweight Node.js API Server (Zero Dependencies, ESM)
// Run this when PHP is not yet installed on your Windows machine:
// npm run api
// ==============================================================================

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
          reference_id: `AP-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
          name: data.name,
          email: data.email,
          phone: data.phone,
          whatsapp: data.whatsapp || '',
          event_date: data.event_date || '',
          event_type: data.event_type || 'Wedding',
          event_location: data.event_location || '',
          message: data.message || '',
          status: 'pending',
          created_at: new Date().toISOString()
        };

        inquiries.unshift(record);
        fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Inquiry submitted successfully! Akash Photography will contact you within 24 hours.',
          reference_id: record.reference_id,
          id: record.id
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Failed to process inquiry: ' + err.message }));
      }
    });
    return;
  }

  // 2. GET /api/inquiries.php
  if ((url === '/api/inquiries.php' || url === '/api/inquiries') && req.method === 'GET') {
    try {
      const inquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: inquiries, total: inquiries.length }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Failed to load inquiries' }));
    }
    return;
  }

  // 3. Health check
  if (url === '/' || url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      service: 'Akash Photography Mock API (ESM)',
      endpoints: ['/api/inquiry.php', '/api/inquiries.php'] 
    }));
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(` Akash Photography Local API Server Running (ESM)`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Target Endpoints:`);
  console.log(`   - POST http://localhost:${PORT}/api/inquiry.php`);
  console.log(`   - GET  http://localhost:${PORT}/api/inquiries.php`);
  console.log(` Storage: ${DATA_FILE}`);
  console.log(`======================================================\n`);
});
