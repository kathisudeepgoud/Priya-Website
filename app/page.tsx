import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SignatureDishes from "@/components/SignatureDishes";
import Story from "@/components/Story";
import InteractiveMenu from "@/components/InteractiveMenu";
import ProddaturIdentity from "@/components/ProddaturIdentity";
import Rating from "@/components/Rating";
import Storefront from "@/components/Storefront";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import ColorPaletteSwitcher from "@/components/ColorPaletteSwitcher";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <Hero />
      <SignatureDishes />
      <Story />
      <InteractiveMenu />
      <ProddaturIdentity />
      <Rating />
      <Storefront />
      <Gallery />
      <Location />
      <Footer />
      <ColorPaletteSwitcher />
    </>
  );
}
