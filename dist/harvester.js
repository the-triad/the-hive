/**/
module.exports = function (creepName) {
	var creep = Game.creeps[creepName];
	var hatchery = Game.spawns[creep.memory.hatcheryName];

	if (!creep.memory.harvestSource) {
		var sources = hatchery.memory.sources;
		for (var index in sources) {
			var hatchSource = sources[index];
			if (hatchSource.assigned < hatchSource.capacity) {
				creep.memory.harvestSource = hatchSource.index;
				hatchSource.assigned++;
				break;
			}
		}
	}
	if (creep.carry.energy < creep.carryCapacity) {
		var roomSources = creep.room.find(FIND_SOURCES);
		var source = roomSources[creep.memory.harvestSource];
		creep.moveTo(source);
		creep.harvest(source);
	} else {
		creep.moveTo(hatchery);
		creep.transferEnergy(hatchery);
	}
};

