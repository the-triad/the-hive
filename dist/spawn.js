Spawn.prototype.buildHarvester = function (source) {
	var max = this.getMaxEnergy();

	// TODO: Using max, we can determine what body to create
	var body = [WORK, WORK, CARRY, MOVE];

	this.createCreep(body, undefined, {
		role: 'harvester',
		spawnID: this.id,
		sourceID: source.id,
		workSpeed: 50 / 4, // from starting til full, how many ticks.
		giver: true
	});
};

Spawn.prototype.buildCourier = function () {
	var max = this.getMaxEnergy();

	// TODO: Using max, we can determine what body to create
	var body = [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE];

	this.createCreep(body, undefined, {
		role: 'courier'
	});
};

Spawn.prototype.buildWorker = function () {
	var max = this.getMaxEnergy();

	// TODO: Using max, we can determine what body to create
	var body = [WORK, WORK, CARRY, MOVE];

	this.createCreep(body, undefined, {
		role: 'worker'
	});
};

Spawn.prototype.bestUnassignedSource = function () {
	return this.pos.findClosestByPath(FIND_SOURCES, {
		filter: function (source) {
			return !source.hasHarvester();
		}
	});
};

Spawn.prototype.getMaxEnergy = function () {
	// TODO: Later we can take into account the extensions.
	return this.energyCapacity;
};

Spawn.prototype.getRoomEnergy = function () {
	// TODO: Later we can take into account the extensions.
	return this.energy;
};

Spawn.prototype.work = function () {
	if (this.getRoomEnergy() < this.getMaxEnergy()) {
		return;
	}
	var unassignedSource = this.bestUnassignedSource();
	if (unassignedSource) {  // i need a thing
		this.buildHarvester(unassignedSource);
	} else if (true) { // TODO: determine if courier is needed.
		this.buildCourier();
	} else if (true) {
		// TODO Build other things.
	}
};

Spawn.prototype.roomCreeps = function () {
	return this.room.find(FIND_MY_CREEPS, {
		filter: function (creep) {
			return creep.memory.role === 'harvester' || creep.memory.role === 'builder';
		}
	})
}
