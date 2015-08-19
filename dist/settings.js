/*global WORK, MOVE, ATTACK, CARRY*/
// This is a read only dictionnary of settings
// used for in game calibration and long term
// startegy adjustments
module.exports = function () {
	return {
		creepRoles: {
			harvester: {
				body: [WORK, WORK, CARRY, MOVE],
				mule: {
					needsMobile: false,
					type: 'mule',
					number: 0.5
				}
			},
			mule: {
				body: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
			},
			courier: {
				body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
			},
			guard: {
				body: [ATTACK, MOVE],
			},
			builder: {
				body: [WORK, CARRY, MOVE],
				mule: {
					needsMobile: true,
					type: 'mule',
					number: 1
				}
			}
		}
	};
};
