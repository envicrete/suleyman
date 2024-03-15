'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col">
      <div className="my-12 flex max-w-xl flex-col rounded-lg border p-8 md:my-24 md:p-12">
        <h2 className="text-xl font-bold">Oho yar!</h2>
        <p className="my-2">
          Our developer is{' '}
          <span className="font-bold text-secondary-foreground">
            addicted to aloo salan
          </span>
          . The owner of this site hasn&apos;t sent him some in a very long
          time. Phir say try karain?
        </p>
        <button
          className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-primary p-4 tracking-wide text-white hover:opacity-90"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
