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
		if(spawn.canCreateCreep() == OK) {
			spawn.createCreep(body, undefined, {role: prodObj.role, hatcheryName: hatcheryName});
			hatchery.prodQ.shift();
		}
	}
	// the hatchery manages its creeps
	// spawn.memory.creeps is a list
	/*var rolesCount = {};
	var totalCount = 0;
	for(var index in spawn.memory.creeps) {
		var creepName = spawn.memory.creeps[index];
		var creep = Game.creeps[creepName];
		var role = creep.memory.role;
		if (!roles[role]) {
			// Load roles on demand
			roles[role] = require(role);
		}
		// make the creep execute it's role.
		roles[role](creepName);

		// no mercy for the weak or the old creep
		if (creep.ticksToLive < 1 || creep.hits < 1) {
			// bye bye creep
			spawn.creeps.splice(index, 1);
		} else {
			// creep is counted in the stats determining what creeps to make
			rolesCount[role] = rolesCount[role] ? rolesCount[role] + 1 : 1;
			totalCount++;
		}
	}
		
	for(var creepRole in Memory.settings.creepRatio) {
		var body = Memory.settings.creepBodies[creepRole];
		var goodValue = Memory.settings.creepRatio[creepRole] / 100 * totalCount;
		if (
			(rolesCount[creepRole] || 0) < goodValue + 1 &&
			spawn.canCreateCreep(body) == OK
		) {
			spawn.memory.creeps = spawn.memory.creeps || [];
			spawn.memory.creeps.push(spawn.createCreep(body, undefined, {role: creepRole, hatcheryName: spawnName}));
			break;
		}
	}*/
	
};

