/**/
var info = require('info')();

var roles = {};

for(var name in Game.creeps) {
	var creep = Game.creeps[name];

	if (!roles[creep.memory.role]) {
		// Load roles on demand
		roles[creep.memory.role] = require(creep.memory.role);
	}
	// make the creep execute it's role.
	roles[creep.memory.role](creep);
}