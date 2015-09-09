Source.prototype.hasHarvester = function () {
	return this.room.find(FIND_MY_CREEPS, {
		filter: function (creep) {
			return creep.memory.role === 'harvester' && creep.memory.sourceID === this.id;
		}
	}).length > 0;
}