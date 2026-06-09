import Image from "next/image";
import { Header } from "./components/header";
import Hero from "./components/hero";
import Footer from "./components/footer";
import { redirect } from "next/navigation";
import { createClient } from "./lib/supabase/server";

export default async function Home() {
    const supabase = await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (user) {
      redirect("/dashboard");
    }
  
  return (
    <div className="">
<Header />
<Hero />
<Footer />
    </div>
  );
}
