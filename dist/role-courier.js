/*global Game, Memory, FIND_SOURCES*/
module.exports = function () {

	if (this.memory.action) {
		var target = Game.getObjectById(this.memory.targetID);
		this.moveTo(target);
		if (this.memory.action === 'take') {
			if(target.transferEnergy(this) === OK) {
				this.memory.action = null;
			}
		} else if (this.memory.action === 'give') {
			if(this.transferEnergy(target) === OK) {
				this.memory.action = null;
			}
		} else {
			// do what?
		}
	} else {
		// get action.
		var pctFull = this.carry.energy / this.carryCapacity;

		if (pctFull > 0.75) {
			// I'm pretty full, find someone to give it to.

			var takers = this.room.find(FIND_MY_STRUCTURES, {
				// Currently only taker is spawn.
				//filter: function (c) {
				//	return c.memory.taker === true;
				//}
			});

			if (takers.length) {
				takers = takers.sort(function (x, y) {
					return x.memory.ttf - y.memory.ttf;
				});

				this.memory.action = 'give';
				this.memory.targetID = takers[0].id;
			}

		} else {
			// Oh noe! I'm empty. Go get someones.
			var givers = this.room.find(FIND_MY_CREEPS, {
				filter: function (c) {
					return c.memory.giver === true;
				}
			});

			if (givers.length) {
				givers = givers.sort(function (x, y) {
					return y.memory.ttf - x.memory.ttf;
				});

				console.log(givers[0].memory.ttf + ' ' + givers[1].memory.ttf)

				this.memory.action = 'take';
				this.memory.targetID = givers[0].id;
			}
		}

	}

	/*
  var hatchery = Memory.hatcheries[this.memory.hatcheryName];
  var spawn = Game.spawns[hatchery.spawnName];

  if (!this.memory.targetName && hatchery.pickupQ.length && this.carry.energy < this.carryCapacity) {
    this.memory.targetName = hatchery.pickupQ.shift();
    Game.creeps[this.memory.targetName].memory.courier = this.name;
    this.memory.delivery = 'pickup';
  }

  if (!this.memory.targetName && hatchery.deliverQ.length) {
    this.memory.targetName = hatchery.deliverQ.shift();
    Game.creeps[this.memory.targetName].memory.courier = this.name;
    spawn.transferEnergy(this);
    this.memory.delivery = 'deliver';
  }

  if (this.memory.targetName) {
    var target = Game.creeps[this.memory.targetName];
    if (!target) {
      this.memory.targetName = null;
    } else {
      this.moveTo(target);
      if (this.memory.delivery === 'deliver') {
        this.transferEnergy(target);
      }
    }
  }

  if (this.memory.delivery === 'pickup' && this.carry.energy === this.carryCapacity) {
    if (this.memory.targetName) {
      var targetCreep = Game.creeps[this.memory.targetName];
      if (targetCreep) {
        targetCreep.memory.courier = null;
      }
      this.memory.targetName = null;
    }

    this.moveTo(spawn);
    this.transferEnergy(spawn);
  }

  if (this.memory.delivery === 'deliver' && this.carry.energy === 0) {
    if (this.memory.targetName) {
      Game.creeps[this.memory.targetName].memory.courier = null;
      this.memory.targetName = null;
    }

    this.moveTo(spawn);
  }*/
};
