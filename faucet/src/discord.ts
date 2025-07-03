import type { Hex } from 'viem'
import { callback, client, guild, secret } from './constants'

export async function getMember(
  guild: string,
  token: string,
): Promise<{ id: string; roles: Array<string>; joinedAt: string } | null> {
  try {
    const res = await fetch(`https://discord.com/api/users/@me/guilds/${guild}/member`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = (await res.json()) as Record<string, any>
    if (!body.user || !body.roles || !body.nick || !body.joined_at) return null

    const id: string = body.user.id
    const roles: Array<string> = body.roles
    const joinedAt: string = body.joined_at

    return { id, roles, joinedAt }
  } catch (error) {
    return null
  }
}

export async function getToken(client: string, secret: string, code: string, redirect: string): Promise<null | string> {
  try {
    const res = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: client,
        client_secret: secret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect,
        scope: 'identify guilds guilds.members.read',
      }),
    })

    const body = (await res.json()) as Record<string, any>

    if (!body.access_token) return null
    const token: string = body.access_token
    return token
  } catch (error) {
    return null
  }
}

export function getCode(url: string): string | null {
  return URL.parse(url)?.searchParams.get('code') || null
}

export function getState(url: string): string | null {
  return URL.parse(url)?.searchParams.get('state') || null
}

export async function authorize(url: string): Promise<null | {
  id: string
  roles: Array<string>
  joinedAt: string
  address: Hex
}> {
  const code = getCode(url)
  if (!code) return null

  const state = getState(url)
  if (!state || !/^0x[a-fA-F0-9]{40}$/.test(state)) return null

  const token = await getToken(client, secret, code, callback)
  if (!token) return null

  const member = await getMember(guild, token)
  if (!member) return null

  return { ...member, address: state as Hex }
}

// https://discord.com/oauth2/authorize?client_id=1390029379022749868&response_type=code&state=0x22cca0357070B1d66b9e1566991836B2a205Bef3&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&scope=identify+guilds+guilds.members.read
