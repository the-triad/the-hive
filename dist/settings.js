// This is a read only dictionnary of settings
// used for in game calibration and long term
// startegy adjustments
module.exports = function () {
	return {
		creepRatio: {
			harvester: 70,
			guard: 30,
			builder: 0
		},
		creepBodies: {
			harvester: [WORK, CARRY, MOVE],
			guard: [ATTACK, ATTACK, MOVE],
			builder: [WORK, MOVE, CARRY]
		}
	};
};
