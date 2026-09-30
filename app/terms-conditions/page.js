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
              Terms &amp; Conditions
            </h1>
            <p className="!text-lg !text-gray-600 !max-w-2xl !mx-auto">
              Welcome to Recreators Design &amp; Media Pvt. Ltd. Please read these Terms carefully before accessing or using our website and services.
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
                      By accessing or using the Recreators website or engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.
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
                      Services Offered
                      <span className="!ml-2 !text-green-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Recreators provides packaging design, branding, web development, SEO, digital marketing, content writing, photography/videography, and related creative and digital services (&quot;Services&quot;). The specific scope, deliverables, and timelines for any project will be defined in a separate proposal, quotation, or service agreement between Recreators and the client.
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
                      Project Engagement &amp; Payment Terms
                      <span className="!ml-2 !text-purple-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <ul className="!space-y-4 !text-gray-700 !leading-relaxed !text-lg">
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-purple-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>All projects begin upon receipt of an agreed advance payment, as specified in the project proposal.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-purple-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Payment schedules, milestones, and final delivery terms will be outlined in the specific project agreement.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-purple-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Delayed payments may result in paused project timelines or deliverables being withheld until dues are cleared.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-purple-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>All prices quoted are exclusive of applicable taxes (GST) unless stated otherwise.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-orange-50 sm:!flex !hidden !rounded-xl  !items-center !justify-center group-hover:!bg-orange-100 !transition-colors !duration-300">
                    <span className="!text-orange-600 !font-semibold !text-lg">04</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Client Responsibilities
                      <span className="!ml-2 !text-orange-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <ul className="!space-y-4 !text-gray-700 !leading-relaxed !text-lg">
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-orange-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Clients are responsible for providing accurate briefs, timely feedback, and necessary materials (content, images, brand assets, etc.) required to complete the project.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-orange-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Delays in client feedback or approvals may impact agreed project timelines, and Recreators shall not be held responsible for such delays.</span>
                      </li>
                    </ul>
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
                      Revisions &amp; Approvals
                      <span className="!ml-2 !text-red-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <ul className="!space-y-4 !text-gray-700 !leading-relaxed !text-lg">
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-red-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Each project includes a defined number of revision rounds, as specified in the project proposal.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-red-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Additional revisions beyond the agreed scope may incur extra charges.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-red-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Final approval from the client is required before a project is considered complete and delivered.</span>
                      </li>
                    </ul>
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
                      Intellectual Property Rights
                      <span className="!ml-2 !text-indigo-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <ul className="!space-y-4 !text-gray-700 !leading-relaxed !text-lg">
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-indigo-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Upon full and final payment, ownership of the final approved deliverables (e.g., final logo files, website code, packaging designs) transfers to the client, unless otherwise specified in the project agreement.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-indigo-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Recreators retains the right to showcase completed work in its portfolio, website, social media, and marketing materials, unless the client requests confidentiality in writing.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-indigo-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Any third-party assets used in a project (stock images, fonts, plugins, etc.) remain subject to their respective licensing terms.</span>
                      </li>
                    </ul>
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
                      Confidentiality
                      <span className="!ml-2 !text-teal-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Both parties agree to keep confidential any proprietary or sensitive business information shared during the course of the project, and not disclose it to third parties without prior written consent.
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
                      Limitation of Liability
                      <span className="!ml-2 !text-pink-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify !mb-4">
                      Recreators strives to deliver high-quality work but shall not be held liable for:
                    </p>
                    <ul className="!space-y-4 !text-gray-700 !leading-relaxed !text-lg">
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-pink-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Indirect, incidental, or consequential damages arising from the use of our services</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-pink-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Business losses resulting from factors outside our control (e.g., third-party platform changes, market conditions)</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-pink-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Delays caused by circumstances beyond our reasonable control (force majeure)</span>
                      </li>
                    </ul>
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
                      Cancellation &amp; Refunds
                      <span className="!ml-2 !text-gray-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <ul className="!space-y-4 !text-gray-700 !leading-relaxed !text-lg">
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-gray-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Project cancellations must be communicated in writing.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-gray-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Any work completed up to the point of cancellation will be billed accordingly.</span>
                      </li>
                      <li className="!flex !items-start">
                        <div className="!w-2 !h-2 !bg-gray-500 !rounded-full !mt-2 !mr-3 !flex-shrink-0"></div>
                        <span>Advance payments are generally non-refundable once work has commenced, unless otherwise agreed in the specific project contract.</span>
                      </li>
                    </ul>
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
                      Third-Party Services
                      <span className="!ml-2 !text-blue-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Where our services involve third-party platforms (e.g., Google Ads, Meta Ads, hosting providers, payment gateways), clients agree to comply with the respective terms of service of those platforms. Recreators is not responsible for changes, outages, or policy updates made by third-party platforms.
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
                      Governing Law
                      <span className="!ml-2 !text-green-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      These Terms and Conditions are governed by the laws of India. Any disputes arising from the use of our services shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 12 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-yellow-50 !rounded-xl sm:!flex !hidden  !items-center !justify-center group-hover:!bg-yellow-100 !transition-colors !duration-300">
                    <span className="!text-yellow-600 !font-semibold !text-lg">12</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Changes to Terms
                      <span className="!ml-2 !text-yellow-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Recreators reserves the right to modify these Terms and Conditions at any time. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 13 */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-cyan-50 !rounded-xl sm:!flex !hidden  !items-center !justify-center group-hover:!bg-cyan-100 !transition-colors !duration-300">
                    <span className="!text-cyan-600 !font-semibold !text-lg">13</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center">
                      Contact Us
                      <span className="!ml-2 !text-cyan-500 !transform group-hover:!translate-x-1 !transition-transform !duration-300">→</span>
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      For any questions regarding these Terms and Conditions, please contact:
                    </p>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mt-2">
                      Recreators Design &amp; Media Pvt. Ltd.<br />
                      910, Spectrum, Sector 76, Metro Station, Tower-A,<br />
                      Behind Sector 50, Noida, Uttar Pradesh 201304, India
                    </p>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mt-2">
                      Email:{" "}
                      <a href="mailto:legal@recreators.com" className="!text-blue-600 hover:!text-blue-700">
                        legal@recreators.com
                      </a>
                      <br />
                      Phone:{" "}
                      <a href="tel:+919811247795" className="!text-blue-600 hover:!text-blue-700">
                        +91-98112-47795
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Contact Information */}
            <div className="!mt-10 !p-6 !bg-gradient-to-r from-blue-50 to-indigo-50 !rounded-xl !border !border-blue-200">
              <h4 className="!text-xl !font-semibold !text-gray-900 !mb-3">Questions?</h4>
              <p className="!text-gray-700">
                If you have any questions about these Terms &amp; Conditions, please contact us at{" "}
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