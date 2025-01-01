import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
        <header className="flex justify-between w-full gap-5 p-3 sticky top-0 z-10 backdrop-blur-md">
          <a className="">
            Kilo
          </a>
          <div className="flex gap-5">
            <a>
                Feature
            </a>
            <a>
                Pricing
            </a>
          </div>
          <Link href="/sign-in">
              <p className="underline">Log In</p>
          </Link>
        </header>
        <div className="container mx-auto min-h-screen">
            {children}
        </div>
    </div>
  );
}
