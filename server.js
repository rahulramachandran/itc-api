/**
* @author : Rahul Ramachandran
*/
'use strict';

(function(config){

	const cluster = require('cluster');
	const os = require('os');
	const app = require('./app');
	let workers = {};

	const onMessage = function(message) {
		console.log(message);
	}
	const spawnWorker = function() {
		let worker = cluster.fork();
		let pid = worker.process.pid;
		workers[pid] = worker;

		// channel to receive information from forks to cluster master
		worker.on('message', onMessage);
	}

	// Setup workers to utilize maximum CPU processing power 
	const setupWorkers = function(){
		let cores = os.cpus();
		for (var i = 0; i < cores.length ; i++) {
			spawnWorker();
		}
		cluster.on('online',function(worker){
			console.log('Worker with process id : ' + worker.process.pid + ' started.');
		});
		// On exit of any cluster worker , create a new worker.
		cluster.on('exit',function(worker, code, signal) {
			console.log('Worker with process id : ' + worker.process.pid + ' exited.');
			console.log('Starting a new worker');
			delete workers[worker.process.pid];
			spawnWorker();
		});
	}

	// Start server with or without cluster
	const startServer = function() {
		if(config.cluster && cluster.isMaster) {
			setupWorkers();
		} else {
			app.listen(config.port, () => {
				console.log('Server started with process id : ', process.pid);
			});
		}
	}

	// Entry point of this application
	startServer();

})(require('./config/config.js'));
