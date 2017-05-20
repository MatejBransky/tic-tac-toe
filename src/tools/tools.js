const compose = (...fns) => input => fns.reduceRight((f, g) => g(f), input)

const pipe = (...fns) => input => fns.reduce((f, g) => g(f), input)

export {
  compose,
  pipe
}
