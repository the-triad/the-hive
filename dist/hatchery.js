/**/
module.exports = function (spawnName) {

	var spawn = Game.creeps[spawnName];

    var harvesterBody = [CARRY, WORK, MOVE];
    var name = "" + Math.random();
    if(spawn.canCreateCreep(body, name) == OK) {
        spawn.createCreep(body, name, {role: 'harvester'});
    }
	
};
