import { createPublicClient, createWalletClient, http, type Hex } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { monadTestnet } from 'viem/chains'

const client = createPublicClient({
  chain: monadTestnet,
  transport: http(),
})

const wallet = createWalletClient({
  chain: monadTestnet,
  transport: http(),
  account: privateKeyToAccount(process.env.FAUCET_KEY! as Hex),
})

export async function getBalance(): Promise<bigint | null> {
  try {
    const balance = await client.getBalance({ address: wallet.account.address })
    return balance
  } catch (error) {
    console.log('get balance:', error)
    return null
  }
}

export async function send(to: Hex, amount: bigint): Promise<Hex | null> {
  try {
    const hash = await wallet.sendTransaction({
      to,
      value: amount,
    })

    return hash
  } catch (error) {
    console.log('get balance:', error)
    return null
  }
}
