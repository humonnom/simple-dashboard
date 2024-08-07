import Link from 'next/link';

export default function SvgHome() {
  return (
    <div className="flex h-screen mx-auto w-full items-center justify-center gap-3">
      <Link
        className={
          'rounded text-blue-500 bg-amber-100 px-3 py-1 hover:bg-amber-200'
        }
        href={'/svg/circle'}
      >
        circle
      </Link>
      <Link
        className={
          'rounded text-blue-500 bg-amber-100 px-3 py-1 hover:bg-amber-200'
        }
        href={'/svg/editor'}
      >
        editor
      </Link>
    </div>
  );
}
