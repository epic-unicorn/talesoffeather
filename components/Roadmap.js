import Link from "next/link";

export default function Roadmap() {
  return (
    <div class="flex min-h-screen items-center bg-amber-100 ">
      <div class="w-2/6 min-w-min pl-20">
        <div class="flex flex-wrap">
          <span class="font-amatic text-8xl text-black">
            Discover adventure is every trait
          </span>
        </div>
      </div>
      <ul class="flex touch-auto space-x-10 p-20">
        <li>
          <div class="item h-80 w-80 -rotate-2 rounded-2xl bg-cover"></div>
        </li>
        <li>
          <div class="item h-80 w-80 rotate-3 rounded-2xl bg-cover"></div>
        </li>
      </ul>
    </div>
  );
}
