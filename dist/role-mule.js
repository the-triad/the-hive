/*global Game, Memory, FIND_SOURCES*/
module.exports = function () {
  var hatchery = Memory.hatcheries[this.memory.hatcheryName];

  var targetName = this.memory.targetName;
  //console.log(targetName);
  var target = Game.creeps[targetName];
  if (target) {
    var mule = target.memory.mule;
    if (!mule || mule === 'incoming') {
      target.memory.mule = this.name;
    }
  }

  this.moveTo(target);
  if (this.memory.muleType === 'pickup' && this.carry.energy >= 0.8 * this.carryCapacity && !this.memory.courier) { // TODO use settings
    hatchery.pickupQ.push(this.name);
    this.memory.courier = 'incoming';
  }

  if (this.memory.muleType === 'deliver' && this.carry.energy <= 0.2 * this.carryCapacity && !this.memory.courier) { // TODO use settings
    hatchery.deliverQ.push(this.name);
    this.memory.courier = 'incoming';
  }

  if (this.memory.muleType === 'pickup') {
    this.transferEnergy(Game.creeps[this.memory.courier]);
  }
};
