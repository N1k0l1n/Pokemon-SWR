import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-center mb-4">Gotta Catch ’Em All!</h1>
      <Link href="/bulbasaur" className="link-link">Bulbasaur</Link>
    </div>
  );
}
