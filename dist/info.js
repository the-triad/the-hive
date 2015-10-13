/*
 This will be for things that could change between ticks and need recalculated.
 Just some basic info right now. Like how many of each role we have.
 */
module.exports = function () {
	var info = {
		count: {},
		total: 0
	};

	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (info.count[creep.memory.role]) {
			info.count[creep.memory.role]++;
		} else {
			info.count[creep.memory.role] = 1;
		}
		info.total++;
	}

	return {
		getInfo: function () {
			return info;
		}
	};
};
