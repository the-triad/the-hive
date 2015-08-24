var roles = {};
Creep.prototype.work = function() {
  var role = this.memory.role;

  // Load roles on demand
  if (!roles[role]) {
    roles[role] = require('role-' + role);
  }
  roles[role].call(this);
};
