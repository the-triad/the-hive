/*global Game, Memory, FIND_SOURCES*/
module.exports = function (creep) {
    
    var hatchery = Memory.hatcheries[creep.memory.hatcheryName];
    
    if (!creep.memory.targetName && hatchery.pickupQ.length) {
        creep.memory.targetName = hatchery.pickupQ.shift().targetName;
        Game.creeps[creep.memory.targetName].memory.courier = creep.name;
    }    

    if (creep.memory.targetName) {
        var target = Game.creeps[creep.memory.targetName];
	    creep.moveTo(target);
    }
}