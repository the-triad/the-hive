/**/
module.exports = function (spawnName, info) {

	var spawn = Game.spawns[spawnName];
	var roles = {};

	// the hatchery manages its creeps
	// spawn.memory.creeps is a list
	rolesCount = {};
	totalCount = 0;
	for(var index in spawn.creeps) {
		var creepName = spawn.creeps[index];
		var creep = Game.creeps[creepName];
		var role = creep.memory.role;
		if (!roles[role]) {
			// Load roles on demand
			roles[role] = require(role);
		}
		// make the creep execute it's role.
		roles[role](name);

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
			rolesCount[creepRole] < goodValue + 1 &&
			spawn.canCreateCreep(body) == OK
		) {
			spawn.memory.creeps.append(spawn.createCreep(body, undefined, {role: creepRole}));
		}
	}
	
};
