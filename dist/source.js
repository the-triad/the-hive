Source.prototype.hasHarvester = function () {
	var self = this;
	return this.room.find(FIND_MY_CREEPS, {
		filter: function (creep) {
			return creep.memory.role === 'harvester' && creep.memory.sourceID === self.id;
		}
	}).length > 0;
}