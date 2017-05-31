import test from 'tape'

/**
 * Returns the function with predefined type of tests.
 * Returned function needs object with "desc" (string) and "assertions" (array) 
 * which contains assertion objects with keys: "actual", "expected" and "msg".
 * @param {String} method Type of test ('equal' | 'deepEqual')
 * @returns {Function} 
 */
const tests = method => {
  return ({ desc, assertions }) => test(
    desc,
    assert => {
      assertions.map(assertion =>
        assert[method](
          assertion.actual,
          assertion.expected,
          assertion.msg
        )
      )
      assert.end()
    }
  )
}

/**
 * Tests assertions. Input: object with description and array of assertions.
 * Every assertion object contains keys: "actual", "expected" and "msg".
 * @param {Object} test Object with description of test and array of assertions
 */
const deepEqualTests = test => tests('deepEqual')(test)

export {
  deepEqualTests
}
