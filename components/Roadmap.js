import Link from "next/link";

export default function Roadmap() {
  return (
    <div className="flex min-h-screen items-center bg-amber-100 ">
      <div className="w-2/6 min-w-min pl-20">
        <div className="flex flex-wrap">
          <span className="font-amatic text-8xl text-black">
            Discover adventure is every trait
          </span>
        </div>
      </div>
      <ul className="flex touch-auto space-x-10 p-20">
        <li>
          <div className="item h-80 w-80 -rotate-2 rounded-2xl bg-cover"></div>
        </li>
        <li>
          <div className="item h-80 w-80 rotate-3 rounded-2xl bg-cover"></div>
        </li>
      </ul>
    </div>
  );
}
