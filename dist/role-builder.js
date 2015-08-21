/*global Game, Memory */
module.exports = function () {
	var hatchery = Memory.hatcheries[this.memory.hatcheryName];

	if (!this.memory.mule) {
		this.memory.mule = 'incoming';
		hatchery.prodQ.unshift({
			role: 'mule',
			muleType: 'deliver',
			targetName: this.name
		});
	}
	if (this.carry.energy === 0 && this.memory.mule && this.memory.mule !== 'incoming') {
		var mule = Game.thiss[this.memory.mule];
		mule.transferEnergy(this);
	} else {
		var targets = this.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length) {
			this.moveTo(targets[0]);
			this.build(targets[0]);
		}
	}
};
