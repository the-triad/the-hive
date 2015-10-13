/*Room.prototype.getSourcesNeedingHarvester = function () {
	var sources = this.find(FIND_SOURCES, {
		filter: function (source) {
			return source.needsHarvester();
		}
	});
};*/

Room.prototype.findTakers = function() {
	var results = this.find(FIND_MY_CREEPS).filter(function(creep) {
		return creep.isTaker();
	});

	return results.concat(this.find(FIND_MY_STRUCTURES).filter(function(structure) {
		return structure.isTaker();
	}));
};

Room.prototype.findGivers = function() {
	var results = this.find(FIND_MY_CREEPS).filter(function(creep) {
		return creep.isGiver();
	});

	results = results.concat(this.find(FIND_MY_STRUCTURES).filter(function(structure) {
		return structure.isGiver();
	}));

	return results.concat(this.find(FIND_DROPPED_ENERGY));
};

Room.prototype.findCourierTargets = function() {
	return this.find(FIND_MY_CREEPS).filter(function(creep) {
    return creep.memory.role === 'courier' && !!creep.memory.targetID;
  }).map(function(courier) {
    return courier.memory.targetID;
  });
};

Room.prototype.findHarvesters = function() {
	return this.find(FIND_MY_CREEPS).filter(function(creep) {
		return creep.memory.role === 'harvester';
	});
};

Room.prototype.findCouriers = function() {
	return this.find(FIND_MY_CREEPS).filter(function(creep) {
		return creep.memory.role === 'courier';
	});
};
