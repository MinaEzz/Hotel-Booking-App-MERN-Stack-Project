import SectionHeader from "@/components/common/section-header/SectionHeader.component";
import { WHY_CHOOSE_US_DATA } from "./WhyChooseUsSection.data";
import Card from "./card/Card.component";

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-12 flex flex-col gap-8">
      <SectionHeader
        title="Why Choose StayFinder"
        subtitle="Your trusted partner in travel accommodation"
      />
      <div className="container">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE_US_DATA.map((item, index) => {
            return <Card key={index} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
}
