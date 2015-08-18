/**/
var info = require('info')();

var roles = {};
var hatchery = require('hatchery');

for(var spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    hatchery(spawn);
}

for(var name in Game.creeps) {
	var creep = Game.creeps[name];
	if (!roles[creep.memory.role]) {
		// Load roles on demand
		roles[creep.memory.role] = require(creep.memory.role);
	}
	// make the creep execute it's role.
	roles[creep.memory.role](name);
}
