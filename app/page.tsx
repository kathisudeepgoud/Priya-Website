import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Categories from "@/components/Categories";
import { IceCreamsSection, FastFoodSection, MilkshakesSection, ParcelSection } from "@/components/MenuSections";
import SpecialScroll from "@/components/SpecialScroll";
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
      <Story />
      <Categories />
      <IceCreamsSection />
      <SpecialScroll />
      <FastFoodSection />
      <MilkshakesSection />
      <ParcelSection />
      <Rating />
      <Storefront />
      <Gallery />
      <Location />
      <Footer />
      <ColorPaletteSwitcher />
    </>
  );
}
