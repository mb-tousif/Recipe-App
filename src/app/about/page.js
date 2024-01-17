import React from 'react'

export default function About() {
  return (
    <section
      className="h-screen bg-cover"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1628000156679-b36c91956540?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ2fHxiYW5raW5nfGVufDB8fDB8fHww')`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl sm:text-5xl capitalize tracking-widest text-white lg:text-7xl">
            Comming Soon
          </h1>

          <p className="mt-6 lg:text-lg text-white">
            You can subscribe to our newsletter, and let you know when we are
            back
          </p>
          <div className="mt-8 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
            <input
              id="email"
              type="text"
              className="rounded-md border border-transparent bg-white/20 px-4 py-2 text-white placeholder-white backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 sm:mx-2"
              placeholder="Email Address"
            />

            <button className="transform rounded-md bg-[#583E26] text-white px-8 py-2 text-sm font-medium capitalize tracking-wide transition-colors duration-200 focus:outline-none sm:mx-2 hover:bg-[#57394a]">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
