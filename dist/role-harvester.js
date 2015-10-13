/*global Game, Memory, FIND_SOURCES*/
module.exports = function () {
	if (this.carry.energy < this.carryCapacity) {
		var source = Game.getObjectById(this.memory.sourceID);

		this.moveTo(source);
		this.harvest(source);
	} else {
		var spawn = Game.getObjectById(this.memory.spawnID);
		this.moveTo(spawn);
		this.transferEnergy(spawn);
	}
};
