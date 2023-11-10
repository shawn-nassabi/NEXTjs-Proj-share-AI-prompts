'use client'

import Link from "next/link"
import Image from "next/image"
import {useState, useEffect} from  'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

  // The useSession() hook is used to get current auth session 
  // session object contins info about the authenticated user if their is one
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null)

  // this hook is called when the server runs
  // used to fetch authentication providers
  // getProviders is provided by the NextAuth.js lib
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="Promptmania logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptmania</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out

            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>

          </div>
        ): (
          <>
            {providers && 
            Object.values(providers).map((provider) => (
              <button 
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
} 

export default Nav