/*global Game, Memory, FIND_SOURCES, MEMORY, OK*/
module.exports = function (hatcheryName) {

	var hatchery = Memory.hatcheries[hatcheryName];
	var spawnName = hatchery.spawnName;
	var spawn = Game.spawns[spawnName];
	

	if (!hatchery.sources) {
		// initial step of figuring out the sources
		hatchery.sources = [];
		var sources = spawn.room.find(FIND_SOURCES);
		for(var sourceIndex in sources) {
			var source = sources[sourceIndex];
			hatchery.sources.push({
				path: spawn.room.findPath(spawn.pos, source.pos),
				assigned: null,
				source: source
			});
			// closest source comes first
			hatchery.sources.sort(function (a, b) {
				return a.path.length - b.path.length;
			});
		}
	}
	
	for (var sourceIndex in hatchery.sources) {
		// we make sure the source has a harvester
		var sourceObj = hatchery.sources[sourceIndex];
		var assigned = sourceObj.assigned;
		var sourceCreep = Game.creeps[assigned];
		if (!sourceCreep && assigned != 'incoming') {
			// we need a harvester there
			hatchery.prodQ.push({
				role: 'harvester',
				source: sourceObj
			});
			sourceObj.assigned = 'incoming';
		}
	}
	
	if (hatchery.prodQ.length) {
		var prodObj = hatchery.prodQ[0];
		var body = Memory.settings.creepRoles[prodObj.role].body;
		if(spawn.canCreateCreep(body) == OK) {
			spawn.createCreep(body, undefined, {
			    role: prodObj.role,
			    hatcheryName: hatcheryName,
			    source: prodObj.source,
			    target: prodObj.targetName
			});
			hatchery.prodQ.shift();
		}
	}
	
};