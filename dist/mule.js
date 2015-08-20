/*global Game, Memory, FIND_SOURCES*/
module.exports = function (creep) {
    
    var hatchery = Memory.hatcheries[creep.memory.hatcheryName];
    
    var targetName = creep.memory.targetName;
    //console.log(targetName);
    var target = Game.creeps[targetName];
    var mule = target.memory.mule;
	if (!mule || mule === 'incoming') {
	    target.memory.mule = creep.name;
	}

	creep.moveTo(target);
    if (
        creep.carry.energy > 0.8 * creep.carryCapacity &&
        !creep.memory.courier
    ) { // TODO use settings
        hatchery.pickupQ.push(creep.name);
        creep.memory.courier = 'incoming';
	}
	creep.transferEnergy(Game.creeps[creep.memory.courier]);
}