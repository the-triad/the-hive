/*global Game, Memory, FIND_SOURCES*/
module.exports = function (creep) {
    
    var hatchery = Memory.hatcheries[creep.memory.hatcheryName];
    console.log(creep.carry);
    if (!creep.memory.targetName && hatchery.pickupQ.length && !creep.carry.energy < creep.carryCapacity) {
        creep.memory.targetName = hatchery.pickupQ.shift();
        Game.creeps[creep.memory.targetName].memory.courier = creep.name;
        creep.memory.delivery = 'pickup';
    }    

    if (creep.memory.targetName) {
        var target = Game.creeps[creep.memory.targetName];
	    creep.moveTo(target);
    }
    
    if (creep.memory.delivery === 'pickup' && creep.carry.energy === creep.carryCapacity) {
        if (creep.memory.targetName) {
            Game.creeps[creep.memory.targetName].memory.courier = null;
            creep.memory.targetName = null;
        }
        var spawn = Game.spawns[hatchery.spawnName]
		creep.moveTo(spawn);
		creep.transferEnergy(spawn);
    }
}