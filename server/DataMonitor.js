const EventEmitter = require('events');

class DataMonitor extends EventEmitter {

  logLevel = 'DEV';

}

module.exports = DataMonitor;