module.exports = function () {
	var targets = this.room.find(FIND_HOSTILE_CREEPS);
	if (targets.length) {
		this.moveTo(targets[0]);
		this.attack(targets[0]);
	}
};
