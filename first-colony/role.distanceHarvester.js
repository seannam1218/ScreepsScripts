var roleDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < 2) {
            creep.memory.status = 'empty';
        }
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'full';
        }
        
        //when creep is emptied, go to the target room
	    if(creep.memory.status == 'empty') {
	        if (creep.room.name == creep.memory.homeRoom) {
	            var exit = creep.room.findExitTo(creep.memory.targetRoom);
	            creep.moveTo(creep.pos.findClosestByRange(exit))
	        }
	        else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
	        }
        }
        //when full, go home and drop off resources
        else if (creep.memory.status == 'full') {
            if (creep.room.name != creep.memory.homeRoom) {
                var exit = creep.room.findExitTo(creep.memory.homeRoom);
	            creep.moveTo(creep.pos.findClosestByRange(exit))
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                if (targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleDistanceHarvester;