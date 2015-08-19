/*globals Game, Memory*/
module.exports = function (creepName) {
    var creep = Game.creeps[creepName];
    var roles = {}    
    var role = creep.memory.role;
	if (!roles[role]) {
		// Load roles on demand
		roles[role] = require(role);
	}
	roles[role](creep);
}