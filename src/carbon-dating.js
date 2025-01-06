const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  if (typeof sampleActivity !== 'string' || isNaN(sampleActivity) || sampleActivity <= 0) {
    return false;
  }

  const activity = parseFloat(sampleActivity);

  if (activity <= 0 || activity >= MODERN_ACTIVITY) {
    return false;
  }

  const age = Math.ceil(HALF_LIFE_PERIOD * (Math.log(MODERN_ACTIVITY / activity) / 0.693));

  return age;
}

module.exports = {
  dateSample
};
