Room.prototype.getSourcesNeedingHarvester = function () {
	var sources = this.find(FIND_SOURCES, {
		filter: function (source) {
			return source.needsHarvester();
		}
	});
}