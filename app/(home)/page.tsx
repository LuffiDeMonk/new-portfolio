import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import Counter from "@/components/home/Counter";
import Services from "@/components/home/Services";
import { getGithubData } from "@/helpers/data/fetchGithubData";



export default async function Home() {
  const githubdata = await getGithubData()
  return (
    <div>
      <Banner />
      <Services />
      <About />
      <Counter
        followers={githubdata.followers}
        following={githubdata.following}
        public_repos={githubdata.public_repos}
      />
    </div>
  );
}
