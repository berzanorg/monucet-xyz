'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

const Icon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    strokeWidth='0'
    viewBox='0 0 492.2 80'
    height='23'
  >
    <g fill='#836EF9'>
      <path d='M50.7 50c4.1 16-8.4 30-25 30s-29-13.8-25-30c2.6-10 15-25 25-50 10 25 22.5 40 25 50' />
      <path
        d='m410 310 21.2 34.3 21.1-34.3 4.7 41h15.6l-11-76.7-30.4 47.2-30.7-47.2-10.8 76.7h15.6zm85.8 4.5q0-7 2.9-12.5 3-5.3 8-8.5 5.1-3 11.9-3.1 6.9 0 12 3.1 5 3.2 8 8.5 2.7 5.4 2.7 12.5t-2.9 12.4q-2.8 5.5-7.9 8.6-5 3-12 3a22 22 0 0 1-11.8-3q-5-3.1-8-8.6t-3-12.5m-15.7 0a41 41 0 0 0 2.8 15.3A36 36 0 0 0 503 350q7 3 15.5 2.9 8.4 0 15.5-2.9a37 37 0 0 0 23.1-35.6q0-8.4-2.9-15.4a36 36 0 0 0-20.4-19.9 43 43 0 0 0-30.6 0 35 35 0 0 0-20.4 20q-2.8 7-2.8 15.2m140.6-36.5V323l-51.8-48.8V351h14.4v-45.2l51.9 48.9V278zm29.7 0v49q0 6.5 2 11.3a23 23 0 0 0 14.8 13.4 38 38 0 0 0 22.2 0q5.1-1.6 9-5 3.7-3.4 5.8-8.4 2.1-4.8 2.1-11.3V278h-14.9v48q0 6.4-3.2 10.1-3.3 3.9-9.8 3.8-6.6 0-9.7-3.8a16 16 0 0 1-3.3-10V278zm83.1 36.5a23 23 0 0 1 12-20.9q5.2-2.8 11.5-2.8a29 29 0 0 1 16.6 5q3.4 2.2 5.7 5v-16.8q-4.5-3.5-9.7-5.6-5.4-2-13.3-2-8.4 0-15.5 2.8a33 33 0 0 0-12.3 8.1 45 45 0 0 0-8.2 12 43 43 0 0 0 0 30.8q2.7 6.7 8.2 12.2t12.4 7.8a56 56 0 0 0 15.4 2.7q8 0 13.3-2a38 38 0 0 0 9.9-5.6v-16.8a30 30 0 0 1-13 8.7q-4.2 1.4-9.4 1.4-6.2 0-11.6-2.9-5.3-3-8.6-8.3a23 23 0 0 1-3.3-12.6m70.2 36.6h36.8v-12.7h-36.8zm0-60.5h36.8V278h-36.8zm0 27.9h34.7V306h-34.7zM794 278v73h14.3v-73zm53.8 13.5h19.6V351h15v-59.6H902V278h-54z'
        transform='translate(-242 -214.8)scale(.81383)'
      />
    </g>
  </svg>
)

const IconX = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 512 512'
  >
    <path
      fill='#836EF9'
      d='M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z'
    ></path>
  </svg>
)

const IconGh = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <path
      fill='#836EF9'
      d='M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
    />
  </svg>
)

function formatTimeRemaining(ms: number) {
  const s = Math.floor(ms / 1000)
  if (s <= 0) return undefined
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0 && m > 0) return `${h} Hour${h > 1 ? 's' : ''} and ${m} Minute${m > 1 ? 's' : ''}`
  if (h > 0) return `${h} Hour${h > 1 ? 's' : ''}`
  if (m > 0 && sec > 0) return `${m} Minute${m > 1 ? 's' : ''} and ${sec} Second${sec > 1 ? 's' : ''}`
  if (m > 0) return `${m} Minute${m > 1 ? 's' : ''}`
  return `${sec} Second${sec > 1 ? 's' : ''}`
}

export default function Home() {
  const [address, setAddress] = useState<string>()
  const [claimedAt, setClaimedAt] = useState<number>()
  const [remaining, setRemaining] = useState<number>()
  const remainingText = useMemo(() => {
    return remaining ? formatTimeRemaining(remaining) : undefined
  }, [remaining])

  const router = useRouter()

  const pathname = usePathname()

  useEffect(() => {
    const cache = localStorage.getItem('claimedAt')
    if (!cache) return
    setClaimedAt(parseInt(cache))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const error = params.get('error')
    const result = params.get('result')

    if (error) {
      router.replace(pathname)
      alert(error)
      return
    }

    if (result && parseInt(result).toString() === result) {
      router.replace(pathname)
      localStorage.setItem('claimedAt', result)
      setClaimedAt(parseInt(result))
      alert('Monucet sent 0.1 MON to you!')
    }
  }, [router, pathname])

  const isRun = useRef(false)
  useEffect(() => {
    if (!claimedAt) return
    if (isRun.current) return
    isRun.current = true
    const startTime = claimedAt + 24 * 60 * 60 * 1000 - Date.now()
    console.log(claimedAt)

    setRemaining((remaining) => (remaining ? remaining - 1000 : startTime))
    setInterval(() => {
      setRemaining((remaining) => (remaining ? remaining - 1000 : startTime))
    }, 1000)
  }, [claimedAt])

  return (
    <div className='flex flex-col min-h-svh items-center bg-gradient-to-br from-white to-white via-[#836EF9]/30'>
      <header className='flex top-0 left-0 z-3  p-4 w-full max-w-3xl'>
        <div className='flex border border-gray-950/15 bg-white/30 backdrop-blur-lg flex-1 h-14 rounded-full px-6 items-center justify-between'>
          <Link
            href='/'
            className='flex gap-1.5 font-bold text-xl items-center '
          >
            <Icon />
          </Link>
          <div className='flex gap-3'>
            <Link
              href='https://github.com/berzanorg/monucet-xyz'
              target='_blank'
            >
              <IconGh />
            </Link>

            <Link
              href='https://x.com/monucet_xyz'
              target='_blank'
            >
              <IconX />
            </Link>
          </div>
        </div>
      </header>

      <main className='flex flex-col px-4 pt-8 pb-36 w-full max-w-3xl gap-8 justify-center flex-1'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1.5'>
            <h1 className='font-bold text-4xl text-center text-gray-900'>Monad Faucet</h1>
            <div className='flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-500 flex-wrap'>
              <span>Made by</span>
              <a
                href='https://x.com/berzanorg'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1 text-[#836EF9] hover:text-gray-700 transition font-medium'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 512 512'
                >
                  <path
                    fill='currentColor'
                    d='M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z'
                  ></path>
                </svg>
                <span>@berzanorg</span>
              </a>
              <span className='text-gray-500'>•</span>
              <span>Powered by</span>
              <a
                href='https://monad.xyz'
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-1 text-[#836EF9] hover:text-gray-700 transition-colors font-medium'
              >
                <div className='relative w-4 h-4 rounded-sm overflow-hidden'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M12 3c-2.599 0-9 6.4-9 9s6.401 9 9 9s9-6.401 9-9s-6.401-9-9-9m-1.402 14.146c-1.097-.298-4.043-5.453-3.744-6.549s5.453-4.042 6.549-3.743c1.095.298 4.042 5.453 3.743 6.549c-.298 1.095-5.453 4.042-6.549 3.743'
                    ></path>
                  </svg>
                </div>
                Monad
              </a>
            </div>
            {/* <p className='text-center font-medium text-gray-500 text-sm'>Public Testnet Faucet</p> */}
          </div>

          <div className='flex flex-col items-center gap-5'>
            <input
              onChange={(e) => setAddress(e.target.value)}
              maxLength={42}
              disabled={!!remainingText}
              pattern='^0x[a-fA-F0-9]{40}$'
              className='bg-white border disabled:cursor-not-allowed invalid:border-red-500/50  border-[#836EF9]/50 rounded-full h-11 font-mono px-5 outline-none w-full max-w-[calc(42ch+2.6rem)]'
            />
            <button
              disabled={!!remainingText}
              onClick={() => {
                if (!address) {
                  alert('Type your address.')
                  return
                }
                if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
                  alert('Wrongly typed address.')
                  return
                }
                open(
                  `https://discord.com/oauth2/authorize?response_type=code&client_id=${'1390029379022749868'}&scope=identify+guilds+guilds.members.read&state=${address}&redirect_uri=${'https://api.monucet.xyz/discord'}&prompt=consent&integration_type=0`,
                  '_self',
                )
              }}
              className='font-bold bg-[#836EF9] text-white h-12 rounded-full px-6 disabled:cursor-not-allowed cursor-pointer'
            >
              {remainingText ? `Wait ${remainingText}` : 'Claim With Discord'}
            </button>
          </div>

          <div className='flex flex-col pt-4'>
            <p className='text-center font-medium text-gray-500 text-xs'>Monucet works with regular donations.</p>

            <p className='text-center font-medium text-gray-500 hover:text-gray-700 text-xs'>
              <Link
                href='https://testnet.monvision.io/address/0x22cca0357070B1d66b9e1566991836B2a205Bef3'
                className='text-[#836EF9] font-semibold'
                target='_blank'
              >
                0x22cca0357070B1d66b9e1566991836B2a205Bef3
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
