class DataProcessor {
  monitor;
  rawData;
  processedData;

  /**
   * @param {Monitor} monitor
   * @param {Object} data
   */
  constructor(monitor, data) {
    this.monitor = monitor;
    this.rawData = data
    this.processData()
  }

  processData() {

  }

  getProcessedData() {
    return this.processedData;
  }
}

module.exports = DataProcessor;