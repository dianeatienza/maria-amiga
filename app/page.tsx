import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl bg-white px-8 py-12 text-center shadow-sm dark:bg-zinc-900">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          María
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Tu mejor amiga para aprender español
        </p>
        <Link
          href="/chat"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-50 dark:focus-visible:ring-offset-zinc-900"
        >
          Start Chatting
        </Link>
      </main>
    </div>
  );
}
