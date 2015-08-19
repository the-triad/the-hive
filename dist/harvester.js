/*global Game, Memory, FIND_SOURCES*/
module.exports = function (creep) {
	
	var hatchery = Memory.hatcheries[creep.memory.hatcheryName];

	/*if (!creep.memory.harvestSource) {
		var sources = hatchery.memory.sources;
		for (var index in sources) {
			var hatchSource = sources[index];
			if (hatchSource.assigned < hatchSource.capacity) {
				creep.memory.harvestSource = hatchSource.index;
				hatchSource.assigned++;
				break;
			}
		}
	}*/
	if (creep.carry.energy < creep.carryCapacity) {
		var roomSources = creep.room.find(FIND_SOURCES);
		var source = roomSources[creep.memory.harvestSource];
		creep.moveTo(source);
		creep.harvest(source);
	} else {
		var spawn = Game.spawns[hatchery.spawnName]
		creep.moveTo(spawn);
		creep.transferEnergy(spawn);
	}
};

