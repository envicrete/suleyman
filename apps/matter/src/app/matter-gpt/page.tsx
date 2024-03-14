import Link from 'next/link';

import SquigglyLines from '#/components/matter-gpt/squiggly-lines';

export default function MatterGptLanding() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <main className="background-gradient mb-8 mt-4 flex w-full flex-1 flex-col items-center px-4 text-center sm:mb-0">
        <a
          href="https://envicrete.com/"
          target="_blank"
          rel="noreferrer"
          className="mb-5 mt-40 rounded-lg border px-4 py-2 text-sm text-secondary-foreground transition duration-300 ease-in-out"
        >
          Introducing Matter AI by{' '}
          <span className="font-semibold text-primary">Envicrete</span>
        </a>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Design your dream room with{' '}
          <span className="relative whitespace-nowrap text-alternate">
            <SquigglyLines />
            <span className="relative font-extrabold">matterGPT</span>
          </span>
        </h1>
        <p className="mx-auto mt-12 max-w-xl text-pretty text-lg leading-7 text-secondary-foreground">
          Upload a photo. See the possibilities with matterGPT. Send the output
          to your architect or our design team for swift delivery.
        </p>
        <Link
          className="mt-8 rounded-full bg-primary px-4 py-3 font-medium text-white shadow transition hover:bg-primary/80 sm:mt-10"
          href="/matter-gpt/dream"
        >
          Design with MatterGPT
        </Link>
      </main>
    </div>
  );
}
