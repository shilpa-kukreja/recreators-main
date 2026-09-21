import { Faq2 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import  Priceing  from "@/components/Priceing";
import RiddaLayout from "@/layout/RiddaLayout";
const page = () => {
  return (
    <RiddaLayout>
      <PageBanner pageTitle="Pricing" pageName="Pricing table" />
      <Priceing />
      <Faq2 />
    </RiddaLayout>
  );
};
export default page;
