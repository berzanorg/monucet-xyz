// monucet api url
export const callback = true ? 'https://api.monucet.xyz/discord' : 'http://localhost:3000/discord'

// monad server
export const guild = '1036357772826120242'

// newbies, full access, nads
export const roles = ['1144287729862049903', '1072682201658970112', '1051562453495971941']

// monucet app id
export const client = process.env.DISCORD_ID!

// monucet app secret
export const secret = process.env.DISCORD_SECRET!

// monucet site url
export const url = true ? 'https://monucet.xyz/' : 'http://localhost:55139/'

// monucet deadline signup timestamp
export const deadline = Date.UTC(2025, 6, 1, 0, 0, 0)

// monucet claim duration
export const duration = 24 * 60 * 60 * 1000

// monucet claim amount
export const faucetAmount = 1n * 10n ** 17n

// monucet minimum balance
export const minBalance = 2n * 10n ** 17n
