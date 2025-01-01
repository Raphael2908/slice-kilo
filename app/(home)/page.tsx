import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import demoText from './demo-text.png'
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
 
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
 
const features = [
  {
    Icon: FileTextIcon,
    name: "Save your time",
    description: "Use our chatbots to talk to your customers in your sleep",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Easy context uploading",
    description: "Upload a simple context brief to your bot and let it handle the work",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Integrate with what'sapp ",
    description: "Our AI system is built to handle incoming queries from what'sapp",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
];

export default function Index(){
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-10">

      <div className="flex flex-col gap-5 items-center min-h-screen border w-full rounded-lg p-2">
        <h1 className="text-4xl text-center">AI automation systems for what'sapp</h1>
        <p>Create a AI chatbot within minutes</p>
          <Link href="/sign-up">
            <Button>Get started</Button>
          </Link>
          <Image
            src={demoText}
            alt="Picture of the demo"
            className="rounded-sm shadow-lg"
          />
        <DotPattern
            cr={1}
            className={cn(
            "[mask-image:radial-gradient(circle,transparent,transparent,white)]",

            )}
          />
      </div>

      <div className="w-full">
        <h1 className="text-2xl">Benefits of an AI</h1>
        <BentoGrid className="w-full">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>

    </div>
  )
}