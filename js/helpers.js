const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

module.exports = { compose, pipe }