import { callback, client, deadline, duration, faucetAmount, guild, minBalance, roles, secret, url } from './constants'
import { authorize, getCode, getMember, getToken } from './discord'
import { getBalance, send } from './monad'

// const authUrl = process.env.PRODUCTION
//   ? `https://discord.com/oauth2/authorize?client_id=1390029379022749868&response_type=code&state=${}&redirect_uri=https%3A%2F%2Fapi.monucet.xyz%2Fdiscord&scope=identify+guilds+guilds.members.read`
//   : 'https://discord.com/oauth2/authorize?client_id=1390029379022749868&response_type=code&state=0x22cca0357070B1d66b9e1566991836B2a205Bef3&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&scope=identify+guilds+guilds.members.read'

let balance: bigint = 0n

const members = new Map<string, number>()

async function updateBalance() {
  const b = await getBalance()
  if (b === null) return
  balance = b
}

await updateBalance()

setInterval(updateBalance, 60000)

console.log('monucet is working...')

console.log(
  `https://discord.com/oauth2/authorize?response_type=code&client_id=${client}&scope=identify%20guilds.join&state=${`0x22cca0357070B1d66b9e1566991836B2a205Bef3`}&redirect_uri=${callback}&prompt=consent&integration_type=0`,
)

Bun.serve({
  routes: {
    '/discord': async (request: Bun.BunRequest<'/discord'>) => {
      const member = await authorize(request.url)

      if (!member) return Response.redirect(`${url}?error=${'Discord connection error.'}`)

      if (!member.roles.some((role) => roles.includes(role)))
        return Response.redirect(`${url}?error=${'You need to have at least newbies role.'}`)

      if (new Date(member.joinedAt).getTime() > deadline)
        return Response.redirect(`${url}?error=${'Your account is created recently.'}`)

      if (members.has(member.id)) {
        const claimedAt = members.get(member.id)!
        const now = Date.now()
        if (claimedAt + duration > now) return Response.redirect(`${url}?error=${'You need to wait for 24 hours.'}`)
      }

      if (balance < minBalance)
        return Response.redirect(`${url}?error=${'Faucet is currently empty and needs donation.'}`)

      members.set(member.id, Date.now())

      balance -= faucetAmount

      const hash = await send(member.address, faucetAmount)

      if (!hash) return Response.redirect(`${url}?error=${'Monad Testnet RPC limit error.'}`)

      return Response.redirect(`${url}?result=${Date.now()}`)
    },
  },
})
