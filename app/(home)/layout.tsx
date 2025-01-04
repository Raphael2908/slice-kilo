import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between w-full gap-5 p-3 sticky top-0 z-10 backdrop-blur-md">
        <a className="">
          <Link href={'/'}>Slice</Link>
        </a>
        <div className="flex gap-5">
          <a>
              Feature
          </a>
          <a>
              Pricing
          </a>
          
          <Link href={'/privacy-policy'}>Privacy Policy</Link>
        </div>
        <Link href="/sign-in">
            <p className="underline">Log In</p>
        </Link>
      </header>
      <div className="container mx-auto flex-1">
          {children}
      </div>
      <DotPattern
          cr={1}
          className={cn(
          "[mask-image:radial-gradient(circle,transparent,transparent,white)]",
          )}
        />
    </div>
  );
}
