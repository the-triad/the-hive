/*global Game, Memory, FIND_SOURCES*/
module.exports = function (creep) {
    
    var hatchery = Memory.hatcheries[creep.memory.hatcheryName];
    var spawn = Game.spawns[hatchery.spawnName];
    
    if (!creep.memory.targetName && hatchery.pickupQ.length && creep.carry.energy < creep.carryCapacity) {
        creep.memory.targetName = hatchery.pickupQ.shift();
        Game.creeps[creep.memory.targetName].memory.courier = creep.name;
        creep.memory.delivery = 'pickup';
    }
    
    if (!creep.memory.targetName && hatchery.deliverQ.length) {
        creep.memory.targetName = hatchery.deliverQ.shift();
        Game.creeps[creep.memory.targetName].memory.courier = creep.name;
        spawn.transferEnergy(creep);
        creep.memory.delivery = 'deliver';
    }

    if (creep.memory.targetName) {
        var target = Game.creeps[creep.memory.targetName];
		creep.moveTo(target);
        if (creep.memory.delivery === 'deliver') {
            creep.transferEnergy(target);
        }
    }
    
    if (creep.memory.delivery === 'pickup' && creep.carry.energy === creep.carryCapacity) {
        if (creep.memory.targetName) {
            var targetCreep = Game.creeps[creep.memory.targetName];
            if (targetCreep) {
                targetCreep.memory.courier = null;
            }
            creep.memory.targetName = null;
        }
        
		creep.moveTo(spawn);
		creep.transferEnergy(spawn);
    }
    
    if (creep.memory.delivery === 'deliver' && creep.carry.energy === 0) {
        if (creep.memory.targetName) {
            Game.creeps[creep.memory.targetName].memory.courier = null;
            creep.memory.targetName = null;
        }
		creep.moveTo(spawn);
    }
};
