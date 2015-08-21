/*global Game, Memory */
module.exports = function (creep) {
    
	var hatchery = Memory.hatcheries[creep.memory.hatcheryName];

	if (!creep.memory.mule) {
		creep.memory.mule = 'incoming';
		hatchery.prodQ.unshift({
			role: 'mule',
			muleType: 'deliver',
			targetName: creep.name
		});
	}
	if (creep.carry.energy === 0 && creep.memory.mule && creep.memory.mule !== 'incoming') {
		var mule = Game.creeps[creep.memory.mule];
		mule.transferEnergy(creep);
	} else {
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length) {
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
		}
	}
};

