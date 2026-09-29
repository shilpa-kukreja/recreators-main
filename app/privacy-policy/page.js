"use client";

import RiddaLayout from "@/layout/RiddaLayout";
import PageBanner from "@/components/PageBanner";

export default function PrivacyPolicyPage() {
  return (
    <RiddaLayout>
      <PageBanner pageTitle="Privacy Policy" pageName="Privacy Policy" />

      <section className="!py-10 !bg-gradient-to-br from-gray-50 to-white">
        <div className="!container !mx-auto !px-2 lg:!px-16 !max-w-8xl">
          {/* Header Section */}
          <div className="!text-center !mb-16">
            <div className="!inline-flex !items-center !text-sm !text-gray-600 !mb-4 !px-4 !py-2 !bg-white !rounded-full !shadow-sm !border !border-gray-200">
              <span className="!w-2 !h-2 !bg-blue-500 !rounded-full !mr-2"></span>
              Last Updated: September 19, 2026 at 10:35
            </div>
            <h1 className="!text-4xl lg:!text-5xl !font-bold  !mb-6 !bg-gradient-to-r from-gray-900 to-blue-900 !bg-clip-text !text-transparent">
              Privacy Policy
            </h1>
            <p className="!text-lg !text-gray-600 !max-w-2xl !mx-auto">
              Your privacy is our priority. Learn how Recreators Design &amp; Media Pvt. Ltd. safeguards and manages your personal information responsibly.
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-8 lg:!p-12">
            <div className="!space-y-12">
              {/* 1. Introduction */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 sm:flex hidden  !h-12 !bg-blue-50 !rounded-xl !items-center !justify-center group-hover:!bg-blue-100 !transition-colors !duration-300">
                    <span className="!text-blue-600 !font-semibold !text-lg">i</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Introduction
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-justify !text-lg">
                      <strong>Recreators Design &amp; Media Pvt. Ltd.</strong> (“Recreators,” “we,” “us,” or “our”) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, use our services, or interact with us in any capacity.
                      <br />
                      By using our website or services, you agree to the terms outlined in this Privacy Policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Information We Collect */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-purple-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-purple-100 !transition-colors !duration-300">
                    <span className="!text-purple-600 !font-semibold !text-lg">📊</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Information We Collect
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mb-6 !text-justify">
                      We may collect the following types of information:
                    </p>
                    <div className="!space-y-6 !text-justify">
                      <div className="!bg-gray-50 !p-2 sm:!p-6 !rounded-xl ">
                        <h4 className="!font-semibold !text-gray-900 !mb-3 !text-lg">Personal Information You Provide</h4>
                        <ul className="!space-y-2 !text-gray-700">
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Name, email address, phone number
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Company name and business details
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Project requirements and briefs shared during consultations
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Payment and billing information (processed securely via third-party payment gateways)
                          </li>
                        </ul>
                      </div>

                      <div className="!bg-gray-50 !p-2 sm:!p-6 !rounded-xl">
                        <h4 className="!font-semibold !text-gray-900 !mb-3 !text-lg">Information Collected Automatically</h4>
                        <ul className="!space-y-2 !text-gray-700">
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            IP address, browser type, and device information
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Pages visited, time spent on our website, and referral source
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Cookies and similar tracking technologies (see Section 5)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-orange-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-orange-100 !transition-colors !duration-300">
                    <span className="!text-orange-600 !font-semibold !text-lg">🎯</span>
                  </div>
                  <div className="!flex-1 !text-justify">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      How We Use Your Information
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mb-6">
                      We use the information we collect to:
                    </p>
                    <div className="!grid md:!grid-cols-2 !gap-4">
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Respond to Inquiries</h4>
                        <p className="!text-gray-700 !text-sm">Respond to inquiries and provide requested services.</p>
                      </div>
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Deliver &amp; Improve Services</h4>
                        <p className="!text-gray-700 !text-sm">Deliver, manage, and improve our design, development, and marketing services.</p>
                      </div>
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Project Communications</h4>
                        <p className="!text-gray-700 !text-sm">Send project updates, invoices, and relevant communications.</p>
                      </div>
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Website Experience</h4>
                        <p className="!text-gray-700 !text-sm">Improve our website's functionality and user experience.</p>
                      </div>
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Marketing Communications</h4>
                        <p className="!text-gray-700 !text-sm">Send marketing communications (only with your consent, and you may opt out anytime).</p>
                      </div>
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Legal Compliance</h4>
                        <p className="!text-gray-700 !text-sm">Comply with legal obligations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. How We Share Your Information */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-indigo-50 !rounded-xl sm:flex hidden  !items-center !justify-center group-hover:!bg-indigo-100 !transition-colors !duration-300">
                    <span className="!text-indigo-600 !font-semibold !text-lg">🤝</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      How We Share Your Information
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mb-4">
                      We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="!space-y-3 !text-gray-700">
                      <li className="!flex !items-start">
                        <span className="!text-indigo-500 !mr-2">•</span>
                        Service providers who assist us in delivering our services (e.g., hosting providers, payment processors)
                      </li>
                      <li className="!flex !items-start">
                        <span className="!text-indigo-500 !mr-2">•</span>
                        Legal authorities if required by law or to protect our rights
                      </li>
                      <li className="!flex !items-start">
                        <span className="!text-indigo-500 !mr-2">•</span>
                        Business partners, only with your explicit consent, for collaborative projects
                      </li>
                    </ul>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mt-4">
                      We ensure any third party we share data with maintains adequate data protection standards.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Cookies & Tracking Technologies */}
              <section className="group">
                <div className="flex items-start space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12  !bg-red-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-red-100 !transition-colors !duration-300">
                    <span className="!text-red-600 !font-semibold !text-lg">🍪</span>
                  </div>
                  <div className="!flex-1 !text-justify">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Cookies &amp; Tracking Technologies
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg">
                      Our website uses cookies to improve user experience, analyze site traffic, and understand visitor behavior. You can control or disable cookies through your browser settings, though this may affect certain website functionalities.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Data Security */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-gray-50 !rounded-xl sm:flex hidden !items-center !justify-center group-hover:!bg-gray-100 !transition-colors !duration-300">
                    <span className="!text-gray-600 !font-semibold !text-lg">🛡️</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Data Security
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Data Retention */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-cyan-50 !rounded-xl sm:flex hidden !items-center !justify-center group-hover:!bg-cyan-100 !transition-colors !duration-300">
                    <span className="!text-cyan-600 !font-semibold !text-lg">🗂️</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Data Retention
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. Your Rights */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-teal-50 sm:flex hidden  !rounded-xl  !items-center !justify-center group-hover:!bg-teal-100 !transition-colors !duration-300">
                    <span className="!text-teal-600 !font-semibold !text-lg">🔒</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Your Rights
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mb-4">
                      Depending on applicable law, you may have the right to:
                    </p>
                    <div className="!grid md:!grid-cols-2 !gap-4 !mb-6">
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Access:</h4>
                        <p className="!text-gray-700 !text-sm">Access the personal information we hold about you.</p>
                      </div>
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Correction:</h4>
                        <p className="!text-gray-700 !text-sm">Request correction of inaccurate information.</p>
                      </div>
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Deletion:</h4>
                        <p className="!text-gray-700 !text-sm">Request deletion of your personal information.</p>
                      </div>
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Withdraw Consent:</h4>
                        <p className="!text-gray-700 !text-sm">Withdraw consent for marketing communications at any time.</p>
                      </div>
                    </div>
                    <p className="!text-gray-700 !leading-relaxed !text-lg">
                      To exercise any of these rights, contact us at{" "}
                      <a href="mailto:contact@recreators.com" className="!text-blue-600 hover:!text-blue-700 !break-all">
                        contact@recreators.com
                      </a>.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. Third-Party Links */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-pink-50 !rounded-xl sm:flex hidden  !items-center !justify-center group-hover:!bg-pink-100 !transition-colors !duration-300">
                    <span className="!text-pink-600 !font-semibold !text-lg">🔗</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Third-Party Links
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies separately.
                    </p>
                  </div>
                </div>
              </section>

              {/* 10. Children's Privacy */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-yellow-50 !rounded-xl sm:flex hidden  !items-center !justify-center group-hover:!bg-yellow-100 !transition-colors !duration-300">
                    <span className="!text-yellow-600 !font-semibold !text-lg">👶</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Children's Privacy
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !text-justify">
                      Our services are not directed toward individuals under the age of 18. We do not knowingly collect personal information from minors.
                    </p>
                  </div>
                </div>
              </section>

              {/* 11. Changes to This Policy */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-green-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-green-100 !transition-colors !duration-300">
                    <span className="!text-green-600 !font-semibold !text-lg">🔄</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Changes to This Policy
                    </h3>
                    <p className="!text-gray-700 !text-justify !leading-relaxed !text-lg">
                      We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The updated version will be posted on this page with a revised "Last Updated" date.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* 12. Contact Information */}
            <div className="!mt-12 !p-2 !bg-gradient-to-r from-blue-50 to-indigo-50 !rounded-2xl !border !border-blue-200">
              <h3 className="!text-2xl !font-bold !text-gray-900 !mb-6 !text-center">Contact Us</h3>
              <p className="!text-gray-700 !text-lg !text-center !mb-6">
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>

              <div className="!grid md:!grid-cols-2 lg:!grid-cols-4 !gap-6 !text-center">
                <div className="!bg-white !p-4 !rounded-xl !shadow-sm !border !border-gray-200">
                  <div className="!w-12 !h-12 !bg-blue-100 !rounded-full !flex !items-center !justify-center !mx-auto !mb-3">
                    <span className="!text-blue-600">📧</span>
                  </div>
                  <h4 className="!font-semibold !text-gray-900 !mb-2">Email</h4>
                  <a href="mailto:contact@recreators.com" className="text-blue-600 hover:!text-blue-700 !text-sm !break-all">
                    contact@recreators.com
                  </a>
                </div>

                <div className="!bg-white !p-4 !rounded-xl !shadow-sm !border !border-gray-200">
                  <div className="!w-12 !h-12 !bg-green-100 !rounded-full !flex !items-center !justify-center !mx-auto !mb-3">
                    <span className="!text-green-600">📞</span>
                  </div>
                  <h4 className="!font-semibold !text-gray-900 !mb-2">Phone</h4>
                  <a href="tel:+919811247795" className="!text-gray-700 !text-sm">
                    +91-98112-47795
                  </a>
                </div>

                <div className="!bg-white !p-4 !rounded-xl !shadow-sm !border !border-gray-200 md:!col-span-2 lg:!col-span-2">
                  <div className="!w-12 !h-12 !bg-purple-100 !rounded-full !flex !items-center !justify-center !mx-auto !mb-3">
                    <span className="!text-purple-600">🏢</span>
                  </div>
                  <h4 className="!font-semibold !text-gray-900 !mb-2">Address</h4>
                  <p className="!text-gray-700 !text-sm">
                    910, SPECTRUM SECTOR 76, METRO STATION, TOWER-A,<br />
                    behind SECTOR 50, Noida, Uttar Pradesh 201304
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RiddaLayout>
  );
}