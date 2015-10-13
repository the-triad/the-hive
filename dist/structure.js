Structure.prototype.isGiver = function() {
  return this.energy && this.energyCapacity && !!this.transferEnergy;
};

Structure.prototype.isTaker = function() {
  return !this.isGiver();
};

Structure.prototype.ttf = function() {
  return 5;
};
