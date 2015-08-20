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
	if (!creep.memory.mule) {
	    creep.memory.mule = 'incoming';
	    hatchery.prodQ.push({
	        role: 'mule',
	        target: creep.name
	    });
	}
	if (creep.carry.energy < creep.carryCapacity) {
		var source = creep.memory.source;
		if (!source.assigned || source.assigned === 'incoming') {
		    source.assigned = creep.name;
		}
		var sources = creep.room.find(FIND_SOURCES).filter(function (src) {
		    return src.id === source.source.id;
		});
		creep.moveTo(sources[0]);
		creep.harvest(sources[0]);
	} else if (creep.memory.mule && creep.memory.mule !== 'incoming') {
		var mule = Game.creeps[creep.memory.mule];
	    creep.moveTo(mule);
	    creep.transferEnergy(mule);
	} else {
		var spawn = Game.spawns[hatchery.spawnName]
		creep.moveTo(spawn);
		creep.transferEnergy(spawn);
	}
};

