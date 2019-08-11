//attack
for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'soldierMelee' || creep.memory.role == 'soldierRange') {
        creep.memory.action == 'attack';
    }
}

//go home
for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'soldierMelee' || creep.memory.role == 'soldierRange') {
        creep.memory.targetRoom == creep.memory.homeRoom;
    }
}

//go right
for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'soldierMelee' || creep.memory.role == 'soldierRange') {
        creep.memory.targetRoom == 'E4S16';
    }
}