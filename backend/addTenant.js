const fs = require('fs');
const path = require('path');

const tenant = process.argv[2]; 
if (!tenant) {
  console.error('Please provide a tenant name');
  process.exit(1);
}

const availableDir = 'D:/nginx-1.28.0/conf/sites-available';
const enabledDir = 'D:/nginx-1.28.0/conf/sites-enabled';

if (!fs.existsSync(availableDir)) fs.mkdirSync(availableDir, { recursive: true });
if (!fs.existsSync(enabledDir)) fs.mkdirSync(enabledDir, { recursive: true });

const confContent = `
server {
    listen 80;
    server_name ${tenant}.localhost;

    location /api/ {
        proxy_pass http://192.168.69.120:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
    
    location / {
        proxy_pass http://192.168.69.35:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`;

const confPath = path.join(availableDir, `${tenant}.conf`);
const linkPath = path.join(enabledDir, `${tenant}.conf`);

fs.writeFileSync(confPath, confContent);

if (!fs.existsSync(linkPath)) {
  fs.copyFileSync(confPath, linkPath);
}

console.log(`Tenant "${tenant}" added successfully.`);
console.log(`Config created at: ${confPath}`);
console.log(`Copied to: ${linkPath}`);
console.log('Please restart NGINX to apply the changes.');
