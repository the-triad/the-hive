/**/
var info = require('info')();

// Settings don't change till reload and belong
// in the memory
if (!Memory.settings) {
	Memory.settings = require('settings')();
}

var roles = {};
var hatchery = require('hatchery');

for(var spawnName in Game.spawns) {
	// delegating creep management in full
	// to the hatchery that owns it
    hatchery(spawnName, info);
}

/*
for(var name in Game.creeps) {
	var creep = Game.creeps[name];
	if (!roles[creep.memory.role]) {
		// Load roles on demand
		roles[creep.memory.role] = require(creep.memory.role);
	}
	// make the creep execute it's role.
	roles[creep.memory.role](name);
}*/
