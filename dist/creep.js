var roles = {};
Creep.prototype.work = function() {
  var role = this.memory.role;

  // Load roles on demand
  if (!roles[role]) {
    roles[role] = require(role);
  }
  roles[role](this);
};
