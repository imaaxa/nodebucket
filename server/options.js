/*============================================;
Title: Node Bucket
Author: anvarik Stack Overflow (https: //stackoverflow.com/questions/22348705/best-way-to-store-db-config-in-node-js-express-app)
Date: 10 March 2020;
Modified By: Cory Gilliam
Description: Web 450 Capstone Project.
===========================================*/

var fs = require('fs');
configPath = __dirname + '/config.json';
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.storageConfig = parsed;
