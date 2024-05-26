import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col space-y-10 items-center justify-center min-h-screen bg-gradient-to-b from-cyan-500 to-blue-500">
        <div className="text-center text-4xl md:text-8xl font-[nunito sans]">
          RENTIFY
        </div>
        <div className="text-center text-xl md:text-2xl font-[nunito sans]">
          For Property Owners: Effortlessly connect with qualified tenants who
          match your propertys criteria. <br/> For Tenants: Find your dream rental
          with ease by inputting your key requirements. <br/> Join Rentify today and
          simplify your rental journey
        </div>
        <div>
          <button className="px-4 py-1.5 rounded-md bg-black text-white text-lg font-[nunito sans]">
            <Link href="/">Get Started </Link>
          </button>
        </div>
      </div>
    </main>
  );
}
