/**
 * reporter 对象的构造函数
 */
class Reporter {
  super(id) {
    this.id = id;
    // key value 对 存count
    this.counts = {};
  }

  doCount = (key, count = 1) => {
    const num = this.counts[key];
    this.counts[key] = num ? count + 1 : count;
  };
}

module.exports = Reporter;
