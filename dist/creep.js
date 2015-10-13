var roles = {};
Creep.prototype.work = function() {
  var role = this.memory.role;

  // Load roles on demand
  if (!roles[role]) {
    roles[role] = require('role-' + role);
  }
  roles[role].call(this);
};

Creep.prototype.isTaker = function() {
  return ['worker'].indexOf(this.memory.role) !== -1;
};

Creep.prototype.isGiver = function() {
  return ['harvester'].indexOf(this.memory.role) !== -1;
};

Creep.prototype.ttf = function() {
  var percentFull = this.carry.energy / this.carryCapacity;
  var workProgress = this.workSpeed() * percentFull;
  return this.workSpeed() - workProgress;
};

Creep.prototype.workSpeed = function() {
  if (!this._workSpeed) { // cache the value for later use.
    var workParts = this.body.filter(function(part) {
      return part === WORK;
    });

    this._workSpeed =  this.carryCapacity / (workParts.length * 2);
  }

  return this._workSpeed;
};

Creep.prototype.takeEnergyFrom = function(target) {
  if (target instanceof Energy) {
    return this.pickup(target);
  } else if (!!target.transferEnergy) {
    return target.transferEnergy(this);
  }
}
