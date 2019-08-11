var roleHarvester = require('role.harvester');
var roleDistanceHarvester = require('role.distanceHarvester')
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSoldierMelee = require('role.soldierMelee');
var roleSoldierRange = require('role.soldierRange');

var HOMEROOM = "E3S16";
var WESTROOM = "E2S16";
var EASTROOM = "E4S16";

var groups;

module.exports.loop = function () {
    
    groups = _.groupBy(Game.creeps, (c) => { return c.memory.role; });

    deleteExtraMemory();

    towerAttack('c12d87d4e9d3028ead0543b3');
    towerRepair('c12d87d4e9d3028ead0543b3');
    
    autoGenerateCreeps('harvester', 2, [WORK,WORK,CARRY,CARRY,MOVE,MOVE], HOMEROOM, HOMEROOM, 'NA');
    autoGenerateCreeps('distanceHarvester', 6, [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], HOMEROOM, WESTROOM, 'NA');
    // autoGenerateCreeps('soldierMelee', 5, [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], HOMEROOM, HOMEROOM, 'standby');
    // autoGenerateCreeps('soldierRange', 2, [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK], HOMEROOM, HOMEROOM, 'NA');
    autoGenerateCreeps('upgrader', 1, [WORK,WORK,WORK,CARRY,MOVE], HOMEROOM, HOMEROOM, 'NA');
    autoGenerateCreeps('builder', 2, [WORK,WORK,CARRY,CARRY,MOVE,MOVE], HOMEROOM, HOMEROOM, 'NA');
    
    showWhichCreepSpawned();

    runCreeps();
}

function deleteExtraMemory() {
    //delete memory of creeps that died
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function towerAttack(id) {
    var tower = Game.getObjectById('5d4f0926758e3f745347d6ec');
    if (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
}

function towerRepair(id) {
    var tower = Game.getObjectById('5d4f0926758e3f745347d6ec');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }
}

function autoGenerateCreeps(role, numLimit, bodyParts, homeRoom, targetRoom, action) {
    if (numLimit == 0) {
        return;
    }
    var professionals = groups[role];
    if(!professionals || professionals.length < numLimit) {
        var newName = role + Game.time;
        console.log('Spawning new ' + role + ': ' + newName);
        Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
            {memory: {role: role, homeRoom: homeRoom, targetRoom: targetRoom, action: action}});
    }
    
}

function showWhichCreepSpawned() {
    //show who is being spawned
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
}

function runCreeps() {
    //make creeps work
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'distanceHarvester') {
            roleDistanceHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'soldierMelee') {
            roleSoldierMelee.run(creep);
        }
        if(creep.memory.role == 'soldierRange') {
            roleSoldierRange.run(creep);
        }
    }
}