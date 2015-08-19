/**/
module.exports = function (creepName) {
    var creep = Game.creeps[creepName];
	var targets = creep.room.find(FIND_HOSTILE_CREEPS);
	if (targets.length) {
		creep.moveTo(targets[0]);
		creep.attack(targets[0]);
	}
};
