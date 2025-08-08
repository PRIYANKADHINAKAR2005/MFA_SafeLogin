const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Encryption simulation endpoint
app.post('/api/encrypt', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Simulate different encryption methods
    const base64 = Buffer.from(text).toString('base64');
    const sha256 = crypto.createHash('sha256').update(text).digest('hex');
    const md5 = crypto.createHash('md5').update(text).digest('hex');
    
    // Simulate AES encryption (demo)
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', aesKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    res.json({
      original: text,
      encrypted: {
        base64,
        sha256,
        md5,
        aes: encrypted
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption failed' });
  }
});

// MFA OTP generation endpoint
app.post('/api/mfa/generate', (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real application, you would send this via email/SMS
    // For demo purposes, we'll just return it
    res.json({
      otp,
      email,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
      message: 'OTP generated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'OTP generation failed' });
  }
});

// MFA OTP verification endpoint
app.post('/api/mfa/verify', (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // In a real application, you would verify against stored OTP
    // For demo purposes, we'll accept any 6-digit OTP
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      res.json({
        verified: true,
        message: 'OTP verified successfully'
      });
    } else {
      res.status(400).json({
        verified: false,
        message: 'Invalid OTP'
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Cyber Security API'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cyber Security API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Encryption: http://localhost:${PORT}/api/encrypt`);
  console.log(`🔑 MFA: http://localhost:${PORT}/api/mfa/generate`);
});

