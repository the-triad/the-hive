// This is a read only dictionnary of settings
// used for in game calibration and long term
// startegy adjustments
module.exports = function () {
	return {
		creepRatio: {
			harvester: 90,
			guard: 8,
			builder: 2
		},
		creepBodies: {
			harvester: [WORK, CARRY, MOVE],
			guard: [ATTACK, ATTACK, MOVE],
			builder: [WORK, MOVE, CARRY]
		}
	};
};
