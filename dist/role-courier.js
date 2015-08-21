/*global Game, Memory, FIND_SOURCES*/
module.exports = function () {
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
  }
};
