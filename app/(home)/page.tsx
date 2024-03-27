import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import Counter from "@/components/home/Counter";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <About />
      <Counter />
    </div>
  );
}
