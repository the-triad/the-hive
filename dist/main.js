/**/
//var info = require('info')();

// Settings don't change till reload and belong
// in the memory
if (!Memory.settings) {
	Memory.settings = require('settings')();
}

var roles = {};
var hatchery = require('hatchery');

for(var spawnName in Game.spawns) {
	// delegating creep management in full
	// to the hatchery that owns it
    hatchery(spawnName);
}
