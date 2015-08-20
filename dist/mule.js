/*global Game, Memory, FIND_SOURCES*/
module.exports = function (creep) {
    
    var hatchery = Memory.hatcheries[creep.memory.hatcheryName];
    
    var targetName = creep.memory.target;
    //console.log(targetName);
    var target = Game.creeps[targetName];
    var mule = target.memory.mule;
	if (!mule || mule === 'incoming') {
	    target.memory.mule = creep.name;
	}

	creep.moveTo(target);
    if (creep.carry.energy > 0.8 * creep.carryCapacity) { // TODO use settings
        hatchery.pickupQ.push(creep.name);
	}
}