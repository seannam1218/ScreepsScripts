var soldierMelee = {
    /** @param {Creep} creep **/
    run: function(creep) {
        keepAwayFromBorders(creep);
        
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) { 
            if(creep.pos.inRangeTo(target, 10)) {
                creep.moveTo(target);
                creep.attack(target);
            }
            return;
        }
        
        // var redFlags = creep.room.find(FIND_FLAGS, {filter: (flag) => {return (flag.color == COLOR_RED)}});
        // if (redFlags[0]) {
        //     creep.moveTo(redFlags[0]);
        //     return;
        // }
        console.log('ATTACK!');        
        creep.moveTo(Game.flags.attack);
	}
};

function keepAwayFromBorders(creep) {
    if (creep.moveTo(Game.flags.attack) == ERR_NO_PATH) {
        if (creep.pos.x <= 1) {
            if (creep.move(RIGHT) == OK) {
              return
            }
        }
        if (creep.pos.x >= 48) {
            if (creep.move(LEFT) == OK) {
              return
            }
        }
        if (creep.pos.y <= 1) {
            if (creep.move(BOTTOM) == OK) {
              return
            }
        }
        if (creep.pos.y >= 48) {
            if (creep.move(TOP) == OK) {
              return
            }
        }
    };
}

module.exports = soldierMelee;