import AboutUs from "@/components/pages/home/AboutUs";
import ContactUs from "@/components/pages/home/ContactUs";
import FAQ from "@/components/pages/home/FAQ";
import GetInTouch from "@/components/pages/home/GetInTouch";
import Hero from "@/components/pages/home/Hero";
import MembershipPlans from "@/components/pages/home/MembershipPlans";

export default function page() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <MembershipPlans />
      <FAQ />
      <ContactUs />
      <GetInTouch />
    </div>
  );
}
