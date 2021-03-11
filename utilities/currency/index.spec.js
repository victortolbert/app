import FormatCurrency from '~/utilities/currency'

describe('getters', () => {
  it('Has no decimals when 0 value', () => {
    const amount = FormatCurrency(1)
    expect(amount).toStrictEqual('$1')
  })
  it('Only has 2 decimals when there are more', () => {
    const amount = FormatCurrency(1.352595)
    expect(amount).toStrictEqual('$1.35')
  })
  it('Has 2 decimals when only 1 decimal place', () => {
    const amount = FormatCurrency(1.1)
    expect(amount).toStrictEqual('$1.10')
  })
  it('Has no decimal places when decimals are 0', () => {
    const amount = FormatCurrency(1.0)
    expect(amount).toStrictEqual('$1')
  })
})
