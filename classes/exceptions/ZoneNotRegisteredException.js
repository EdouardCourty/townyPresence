class ZoneNotRegisteredException extends Error {
  zoneNotRegistered = true

  constructor() {
    super();
  }
}

module.exports = ZoneNotRegisteredException