/**/
module.exports = function (spawnName) {

	var spawn = Game.creeps[spawnName];

    var harvesterBody = [CARRY, WORK, MOVE];
    var name = "" + Math.random();
    if (spawn.canCreateCreep(harvesterBody, name) == OK) {
        spawn.createCreep(harvesterBody, name, {role: 'harvester'});
    }
	
};
