Spawn.prototype.buildHarvester = function (source) {
	var body = [WORK, WORK, CARRY, MOVE];
	var max = 300;

	this.createCreep(body, undefined, {
		role: 'harvester',
		spawnID: this.id,
		sourceID: source.id
	});
};

Spawn.prototype.bestUnassignedSource = function () {
	var sources = this.pos.findClosestByPath(FIND_SOURCES, {
		filter: function (source) {
			return source.hasHarvester();
		}
	});
	return sources[0];
};

Spawn.prototype.work = function () {
	if (this.energy < this.energyCapacity) {
		return;
	}
	var unassignedSource = this.bestUnassignedSource();
	if (unassignedSource) {  // i need a thing
		this.buildHarvester(unassignedSource);
	} else if () {

	}
};

