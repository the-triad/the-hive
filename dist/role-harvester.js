/*global Game, Memory, FIND_SOURCES*/
module.exports = function () {
	var hatchery = Memory.hatcheries[this.memory.hatcheryName];

	if (!this.memory.mule) {
		this.memory.mule = 'incoming';
		hatchery.prodQ.unshift({
			role: 'mule',
			muleType: 'pickup',
			targetName: this.name
		});

		hatchery.prodQ.unshift({
			role: 'courier'
		});
	}

	if (this.carry.energy < this.carryCapacity) {
		var source = this.memory.source;

		if (!source.assigned || source.assigned === 'incoming') {
			source.assigned = this.name;
		}
		var sources = this.room.find(FIND_SOURCES).filter(function (src) {
			return src.id === source.source.id;
		});

		this.moveTo(sources[0]);
		this.harvest(sources[0]);
	} else if (this.memory.mule && this.memory.mule !== 'incoming') {
		var mule = Game.creeps[this.memory.mule];
		this.transferEnergy(mule);
	} else {
		var spawn = Game.spawns[hatchery.spawnName];
		this.moveTo(spawn);
		this.transferEnergy(spawn);
	}
};
