import { titleCase } from '../titleCase'

describe('titleCase', () => {
  it('should have each first letter of each word be capitalize', async () => {
    const title = titleCase('/time-to-stop')

    expect(title).toEqual('Time To Stop')
  })

  describe('when on errors', () => {
    it("should return '' for empty string", async () => {
      const title = titleCase('')

      expect(title).toEqual('')
    })

    it('should return null for index does not exist', async () => {
      const title = titleCase('/time-to-stop', 3)

      expect(title).toEqual('')
    })
  })

  describe('when having multiple urls', () => {
    it('should use parent url by default', async () => {
      const title = titleCase('/time-to-stop/right-now')

      expect(title).toEqual('Time To Stop')
    })

    it('should use child url when index points to it', async () => {
      const title = titleCase('/time-to-stop/right-now', 1)

      expect(title).toEqual('Right Now')
    })
  })
})
