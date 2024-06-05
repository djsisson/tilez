import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-secondary p-2 text-center">
      <Link href="/about">© DJ Sisson et al. Enterprises, 2024.</Link>
    </div>
  );
}
