import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-secondary p-2 text-center">
      <Link href="/about" className="cursor-pointer hover:underline">
        © The Group Of Lovely People, 2024.
      </Link>
    </div>
  );
}
