/**/
module.exports = function (spawnName) {

	var spawn = Game.spawns[spawnName];

    var harvesterBody = [CARRY, WORK, MOVE];
    if (spawn.canCreateCreep(harvesterBody) == OK) {
        spawn.createCreep(harvesterBody, undefined, {role: 'harvester'});
    }
	
};
