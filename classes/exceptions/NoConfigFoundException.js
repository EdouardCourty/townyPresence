class NoConfigFoundException extends Error {
  e = "noConfig"
  constructor() {
    super();
  }
}

module.exports = NoConfigFoundException