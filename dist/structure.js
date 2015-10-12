Structure.prototype.isGiver = function() {
  if (this.energy && this.energyCapacity) {
    return true;
  }
  return false;
};

Structure.prototype.isTaker = function() {
  return !this.isGiver();
};

Structure.prototype.ttf = function() {
  return 5;
};
