/*global Memory, Game*/

require('spawn');
require('creep');
require('source');

for (var spawn in Game.spawns) {
	Game.spawns[spawn].work();
}

for (var creepName in Game.creeps) {
	Game.creeps[creepName].work();
}

/*
//var info = require('info')();

// Settings don't change till reload and belong
// in the memory
if (!Memory.settings) {
	Memory.settings = require('settings')();
}

// hatchery is virtual control unit
// of a zone. It is in managing all workers
// and building in there and could have several
// spawn points
var hatchery = require('hatchery');

if (!Memory.hatcheries && Object.keys(Game.spawns).length) {
	// initial zone
	Memory.hatcheries = {
		'hatchery1': {
			spawnName: Object.keys(Game.spawns)[0],
			prodQ: [],
			buildQ: [],
			pickupQ: [],
			deliverQ: []
		}
	};
}

for(var hatcheryName in Memory.hatcheries) {
	// delegating creep management in full
	// to the hatchery that owns it
    hatchery(hatcheryName);
}

var creep = require('creep');
for (var creepName in Game.creeps) {
	Game.creeps[creepName].work();
}
//ACHTUNG! before putting more stuff in here:
// will it scale with more zones or should
// it be in hatchery instead?
*/