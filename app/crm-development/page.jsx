import CrmHero from "@/components/crm/CrmHero";
import RiddaLayout from "@/layout/RiddaLayout";
import CrmJourney from "@/components/crm/CrmJourney";
import CrmPipeline from "@/components/crm/CrmPipeline";
import CrmTypes from "@/components/crm/CrmTypes";
import CrmCustomer360 from "@/components/crm/CrmCustomer360";
import CrmAutomation from "@/components/crm/CrmAutomation";
import CrmAnalytics from "@/components/crm/CrmAnalytics";
import CrmPowerFeatures from "@/components/crm/CrmPowerFeatures";
import CrmIntegrationsSecurity from "@/components/crm/CrmIntegrationsSecurity";
import CrmFinalCTA from "@/components/crm/CrmFinalCTA";

export const metadata = {
  title: "Custom CRM Development | ReCreators",
  description:
    "We design and build custom CRMs that fit your exact workflow — so you close more deals, faster.",
};

export default function CrmDevelopmentPage() {
  return (
    <RiddaLayout>
    <main className="!bg-[#0A0A0F]">
      <CrmHero />
      <CrmJourney />
      <CrmPipeline/>
      <CrmTypes/>
      {/* <CrmCustomer360/>
      <CrmAutomation/> */}
      <CrmPowerFeatures/>
      <CrmAnalytics/>
      <CrmIntegrationsSecurity/>
      <CrmFinalCTA/>
    </main>
    </RiddaLayout>
  );
}