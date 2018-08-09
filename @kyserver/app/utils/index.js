/**
 * @desc 延迟方法
 * @param ms {number}
 */
const sleep = async (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

module.exports = {
  sleep,
}