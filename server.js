const express = require('express');
const cors = require('cors');

const app = express();

// Allows your extension to communicate with this server
app.use(cors());
app.use(express.json());

// THIS IS YOUR GUEST LIST (Your database of allowed users)
// You can add or remove keys here whenever you sell a subscription!
const ACTIVE_LICENSES = {
  "DEV-TEST-KEY": { status: "ACTIVE", expires: "2030-01-01" },
  "USER-KEY-101": { status: "ACTIVE", expires: "2026-12-31" }
};

// This is the endpoint your extension will talk to
app.post('/v1/verify', (req, res) => {
  const { licenseKey } = req.body;
  console.log(`[SERVER LOG] Received key check request for: ${licenseKey}`);

  const license = ACTIVE_LICENSES[licenseKey];

  if (license && license.status === "ACTIVE") {
    // Key is found and active!
    return res.json({ valid: true, expires: license.expires });
  } else {
    // Key is missing or expired!
    return res.status(403).json({ valid: false, reason: "Invalid key" });
  }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`SURVEYLENCE License Server Active!`);
  console.log(`Running locally at: http://localhost:${PORT}`);
  console.log(`=================================`);
});