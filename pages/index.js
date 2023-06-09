import About from "@/Components/About";
import Blog from "@/Components/Blog";
import Cards from "@/Components/Cards";
import Choose from "@/Components/Choose";
import Counter from "@/Components/Counter";
import Footer from "@/Components/Footer";
import Getstarted from "@/Components/Getstarted";
import Header from "@/Components/Header";
import Service from "@/Components/Service";
import Slider from "@/Components/Sliders";
import Team from "@/Components/Team";
import Testimonial from "@/Components/Testimonial";
import Track from "@/Components/Track";
import Layout from "@/layout/Layout";
export default function Home() {
  return (
    <Layout>
      <main>
        <Slider />
        <Cards />
        <About />
        <Service />
        <Choose />
        <Getstarted />
        <Counter />
        <Team />
        <Testimonial />
        <Blog />
        <Track />
      </main>
    </Layout>
  );
}
