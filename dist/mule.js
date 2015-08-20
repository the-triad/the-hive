/*global Game, Memory, FIND_SOURCES*/
module.exports = function (creep) {
    
    var hatchery = Memory.hatcheries[creep.memory.hatcheryName];
    
    var target = creep.memory.target;
	if (!target.assigned || target.assigned === 'incoming') {
	    target.assigned = creep.name;
	}

	creep.moveTo(Game.creeps[creep.memory.target]);
    if (creep.carry.energy > 0.8 * creep.carryCapacity) { // TODO use settings
        hatchery.pickupQ.push(creep.name);
	}
}