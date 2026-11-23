import { titleCase } from './titleCase'

describe('GIVEN using titleCase', () => {
  test('WHEN given a path THEN each word starts with a capital letter', () => {
    expect(titleCase('/time-to-stop')).toEqual('Time To Stop')
  })

  test('WHEN the path is empty THEN it returns an empty string', () => {
    expect(titleCase('')).toEqual('')
  })

  test('WHEN the index has no path segment THEN it returns an empty string', () => {
    expect(titleCase('/time-to-stop', 3)).toEqual('')
  })

  describe('WHEN the path has two segments', () => {
    test('AND no index is given THEN it uses the first segment', () => {
      expect(titleCase('/time-to-stop/right-now')).toEqual('Time To Stop')
    })

    test('AND the index points at the second segment THEN it uses that segment', () => {
      expect(titleCase('/time-to-stop/right-now', 1)).toEqual('Right Now')
    })
  })
})
