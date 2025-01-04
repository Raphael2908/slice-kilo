import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import demoPic from './Demo-Pic.svg'
import demoPicMobile from './demo-pic-mobile.svg'

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
    name: "Train an AI chat bot on your context",
    description: "Upload a simple context brief to your bot and let it handle the work",
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
      <div className="flex flex-col gap-5 items-center min-h-screen w-full py-2">

        <div className="lg:flex-row flex items-center gap-5 flex-col">
          
          <div className="flex flex-col gap-3">
            <h1 className="lg:text-3xl lg:text-left text-center text-xl">AI AUTOMATION SYSTEM FOR WHAT'SAPP</h1>
            <p className="lg:text-lg lg:text-wrap lg:text-left text-xs text-nowrap text-center">Automate your customer relationship management within minutes</p>
            <div className="flex justify-between w-full">
              <input className="w-full p-2 border rounded-l-lg" placeholder="Email" type="email" name="waitlist" id="" />
              <button className="text-white text-nowrap bg-green-600 p-2 rounded-r-lg" type="submit" >Join the waitlist</button>
            </div>
          </div>
          
          <Image className="hidden lg:block xl:h-[500px] h-[300px] w-[200]px" src={demoPic} alt="Demo picture of ai system"/>
          <Image className="lg:hidden h-[400px] mr-32" src={demoPicMobile} alt="Demo picture of ai system"/>

        </div>


        <div className="w-full">
          <h1 className="text-2xl">What we can do for you</h1>
          <BentoGrid className="w-full">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
     
      </div>

  )
}