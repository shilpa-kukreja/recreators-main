"use client";

import RiddaLayout from "@/layout/RiddaLayout";
import PageBanner from "@/components/PageBanner";

export default function TermsPage() {
  return (
    <RiddaLayout>
      <PageBanner pageTitle="Terms & Conditions" pageName="Terms & Conditions" />

      <section className="!py-10 !bg-gradient-to-br from-gray-50 to-white">
        <div className="!container !mx-auto !px-2 lg:!px-16 lg:!max-w-8xl !w-full">
          {/* Header Section */}
          <div className="!text-center !mb-16">
            <div className="!inline-flex !items-center !text-sm !text-gray-600 !mb-4 !px-4 !py-2 !bg-white !rounded-full !shadow-sm !border !border-gray-200">
              <span className="!w-2 !h-2 !bg-blue-500 !rounded-full !mr-2"></span>
              Last Updated: December 19, 2024
            </div>
            <h1 className="!text-4xl lg:!text-5xl !font-bold  !mb-6 !bg-gradient-to-r from-gray-900 to-blue-900 !bg-clip-text !text-transparent">
              Terms of Use
            </h1>
            <p className="!text-lg !text-gray-600 !max-w-2xl !mx-auto">
              Welcome to Recreaters Design & Media Pvt. Ltd. Please read these Terms carefully before accessing or using our website and services.
            </p>
          </div>

          {/* Terms Content */}
          <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-4 lg:!p-12">
            <div className="!space-y-12">
              {/* Section 1 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-blue-50 sm:!flex !hidden !rounded-xl  !items-center !justify-center group-hover:!bg-blue-100 !transition-colors !duration-300">
                    <span className="!text-blue-600 !font-semibold !text-lg">01</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Acceptance of Terms
                      <span className="!ml-2 !text-blue-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      By using our website, purchasing our services, or engaging with any digital platform operated by Recreaters Design & Media Pvt. Ltd. (“we,” “us,” “our”), you agree to comply with and be bound by these Terms of Use.
                      If you do not agree to these terms, please discontinue use of our website and services immediately.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-green-50 sm:!flex !hidden !rounded-xl  !items-center !justify-center group-hover:!bg-green-100 !transition-colors !duration-300">
                    <span className="!text-green-600 !font-semibold !text-lg">02</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Online Service Agreement
                      <span className="!ml-2 !text-green-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Our platform offers professional design, branding, and media solutions customized for businesses and individuals.
                      By engaging with our services, you confirm that you are of legal age to enter into a binding agreement or have obtained appropriate parental or guardian consent to do so.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-purple-50 sm:!flex !hidden !rounded-xl  !items-center !justify-center group-hover:!bg-purple-100 !transition-colors !duration-300">
                    <span className="!text-purple-600 !font-semibold !text-lg">03</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      General Conditions
                      <span className="!ml-2 !text-purple-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <ul className="!space-y-4 !text-gray-700 !leading-relaxed !text-lg">
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-purple-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Recreators Design & Media Pvt. Ltd. reserves the right to refuse service to any individual or entity at our sole discretion.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-purple-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Unauthorized use of our services, including but not limited to illegal activities, distribution of malware, or transmission of harmful content, is strictly prohibited.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-orange-50 sm:flex !hidden !rounded-xl  !items-center !justify-center group-hover:!bg-orange-100 !transition-colors !duration-300">
                    <span className="!text-orange-600 !font-semibold !text-lg">04</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Intellectual Property Rights
                      <span className="!ml-2 !text-orange-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      All content available on this website  including but not limited to text, graphics, logos, designs, images, videos, and software  is the exclusive property of Recreaters Design & Media Pvt. Ltd. and protected under applicable copyright, trademark, and intellectual property laws.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-red-50 !rounded-xl sm:!flex !hidden !items-center !justify-center group-hover:!bg-red-100 !transition-colors !duration-300">
                    <span className="!text-red-600 !font-semibold !text-lg">05</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Information Accuracy
                      <span className="!ml-2 !text-red-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-justify !text-lg">
                      While we strive to maintain accurate and up-to-date information, Recreators Design & Media Pvt. Ltd.
                      does not guarantee the completeness, reliability, or accuracy of all website content. Users are
                      advised to verify critical information before making decisions based on website materials.You may not reproduce, modify, distribute, or exploit any material without prior written permission from us
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-indigo-50 !rounded-xl sm:!flex !hidden  !items-center !justify-center group-hover:!bg-indigo-100 !transition-colors !duration-300">
                    <span className="!text-indigo-600 !font-semibold !text-lg">06</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Service Modifications
                      <span className="!ml-2 !text-indigo-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      We reserve the right to update, suspend, or discontinue any aspect of our services, including pricing, features, or availability, at any time without prior notice.
                      Continued use of our website or services following such changes will constitute acceptance of the modified terms
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-teal-50 !rounded-xl sm:!flex !hidden !items-center !justify-center group-hover:!bg-teal-100 !transition-colors !duration-300">
                    <span className="!text-teal-600 !font-semibold !text-lg">07</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Third-Party Services
                      <span className="!ml-2 !text-teal-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Our website may contain links to third-party websites or platforms.
                      Recreaters Design & Media Pvt. Ltd. is not responsible for the content, accuracy, or privacy practices of these external sites.
                      Accessing third-party links is entirely at your own risk.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-pink-50 !rounded-xl sm:!flex !hidden  !items-center !justify-center group-hover:!bg-pink-100 !transition-colors !duration-300">
                    <span className="!text-pink-600 !font-semibold !text-lg">08</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      User Feedback & Submissions
                      <span className="!ml-2 !text-pink-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Any ideas, feedback, or creative materials submitted to Recreaters Design & Media Pvt. Ltd.  whether through email, forms, or other communication channels  become our property.
                      We may use, modify, or publish such materials for marketing, improvement, or research purposes without any obligation to compensate or credit the contributor.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-gray-50 !rounded-xl  !items-center sm:!flex !hidden !justify-center group-hover:!bg-gray-100 !transition-colors !duration-300">
                    <span className="!text-gray-600 !font-semibold !text-lg">09</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Limitation of Liability
                      <span className="!ml-2 !text-gray-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed text-lg !text-justify">
                      Recreators Design & Media Pvt. Ltd. shall not be held liable for any direct, indirect,
                      incidental, or consequential damages arising from the use or inability to use our services,
                      including but not limited to service interruptions, errors, or omissions in content.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-blue-50 !rounded-xl sm:!flex !hidden   !items-center !justify-center group-hover:!bg-blue-100 !transition-colors !duration-300">
                    <span className="!text-blue-600 !font-semibold !text-lg">10</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Governing Law & Jurisdiction
                      <span className="!ml-2 !text-blue-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      These Terms of Service are governed by and construed in accordance with the laws of India.
                      Any legal disputes shall be subject to the exclusive jurisdiction of the courts located in
                      India, and users consent to personal jurisdiction in such courts.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 11 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-green-50 !rounded-xl sm:!flex !hidden  !items-center !justify-center group-hover:!bg-green-100 !transition-colors !duration-300">
                    <span className="!text-green-600 !font-semibold !text-lg">11</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Terms Modification
                      <span className="!ml-2 !text-green-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-juistify">
                      Recreators Design & Media Pvt. Ltd. reserves the right to update, modify, or replace any
                      part of these Terms of Service at our discretion. It is your responsibility to check this
                      page periodically for changes. Continued use of the website following changes constitutes
                      acceptance of the revised terms.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Contact Information */}
            <div className="!mt-10 !p-6 !bg-gradient-to-r from-blue-50 to-indigo-50 !rounded-xl !border !border-blue-200">
              <h4 className="!text-xl !font-semibold !text-gray-900 !mb-3">Questions?</h4>
              <p className="!text-gray-700">
                If you have any questions about these Terms of Use, please contact us at{" "}
                <a href="mailto:legal@recreators.com" className="!text-blue-600 hover:!text-blue-700 !font-medium !underline">
                  legal@recreators.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </RiddaLayout>
  );
}