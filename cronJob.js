const cron = require('node-cron');
const start = require('./index');

// Define a cron job that runs every 1 minute
// */10  for sec
cron.schedule('* * * * *', () => {
    // console.log('Cron job executed at:', new Date().toLocaleString());
    start();
});

// Keeping the process running to allow the cron job to keep executing
console.log('Cron job started, will run every 1 mnt...');
