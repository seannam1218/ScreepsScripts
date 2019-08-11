var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');

var timer = 0;
var TIMER_RESET = 10;

module.exports.loop = function () {

    for(var name in Game.rooms) {
        if (timer == 0) {
            console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
    timer += 1;
    timer = timer%TIMER_RESET;
}