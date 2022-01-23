import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pb-4 bg-th-background-secondary text-th-accent-medium">
      <div className="mx-auto divide-y divide-gray-200">
        <div className="flex flex-col-reverse justify-between pt-5 pb-4 border-t lg:flex-row bg-top px-4 sm:px-6 md:px-8">
          <ul className="flex flex-col space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <span>text</span>
          </ul>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <Link href="/"> 
              <a               
                className="text-th-primary-medium transition-colors duration-300 hover:text-th-accent-medium font-semibold tracking-tight"
              >
                © 2021 Company Inc.
              </a>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
}
