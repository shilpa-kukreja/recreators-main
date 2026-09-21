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
              Last Updated: December 19, 2024 at 10:35
            </div>
            <h1 className="!text-4xl lg:!text-5xl !font-bold  !mb-6 !bg-gradient-to-r from-gray-900 to-blue-900 !bg-clip-text !text-transparent">
              Privacy Policy
            </h1>
            <p className="!text-lg !text-gray-600 !max-w-2xl !mx-auto">
              Your privacy is our priority. Learn how Recreaters Design & Media Pvt. Ltd. safeguards and manages your personal information responsibly.
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-8 lg:!p-12">
            <div className="!space-y-12">
              {/* Introduction */}
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
                      <strong>Recreators Design & Media Pvt. Ltd.</strong> (“we,” “us,” “our”) is dedicated to protecting your personal data and maintaining your trust. This Privacy Policy explains how we collect, use, and share your information when you visit our website, engage with our campaigns, or use any of our design, media, or digital marketing services (collectively, the “Services”).
                      By using our Services, you consent to the terms outlined in this Privacy Policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Policy Updates */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-green-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-green-100 !transition-colors !duration-300">
                    <span className="!text-green-600 !font-semibold !text-lg">🔄</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Changes to the Privacy Policy
                    </h3>
                    <p className="!text-gray-700 !text-justify !leading-relaxed !text-lg">
                      We may revise this policy from time to time to comply with legal, operational, or service updates. The “Last Updated” date on this page reflects the latest version. Continued use of our Services after such updates signifies your acceptance of the revised policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Collection */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-purple-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-purple-100 !transition-colors !duration-300">
                    <span className="!text-purple-600 !font-semibold !text-lg">📊</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      What Information We Collect
                    </h3>
                    <div className="!space-y-6 !text-justify">
                      <div className="!bg-gray-50 !p-2 sm:!p-6 !rounded-xl ">
                        <h4 className="!font-semibold !text-gray-900 !mb-3 !text-lg">Information Provided by You</h4>
                        <ul className="!space-y-2 !text-gray-700">
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Contact details: Name, email, phone number, and address
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Account details: Username, password, and login credentials
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Payment details: Billing address, transaction records, and order history
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Support communication: Details shared while contacting our customer team
                          </li>
                        </ul>
                      </div>

                      <div className="!bg-gray-50 !p-2 sm:!p-6 !rounded-xl">
                        <h4 className="!font-semibold !text-gray-900 !mb-2 !text-lg">Information Collected Automatically</h4>
                        <p className="!text-gray-700">
                         Usage data: IP address, browser type, device identifiers, and pages visited.
                        </p>
                         <p className="!text-gray-700">
                         Cookies & analytics: Behavior tracking through cookies, analytics tools, and other technologies
                        </p>
                      </div>

                      <div className="!bg-gray-50 !p-2 sm:!p-6 !rounded-xl">
                        <h4 className="!font-semibold !text-gray-900 !mb-2 !text-lg">Information from Third Parties</h4>
                        <ul className="!space-y-2 !text-gray-700">
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Payment processors: For secure and verified transactions
                          </li>
                          <li className="!flex !items-start">
                            <span className="!text-purple-500 !mr-2">•</span>
                            Marketing partners: For campaign optimization and performance tracking
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-orange-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-orange-100 !transition-colors !duration-300">
                    <span className="!text-orange-600 !font-semibold !text-lg">🎯</span>
                  </div>
                  <div className="!flex-1 !text-justify">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      How We Use Your Information
                    </h3>
                    <div className="!grid md:!grid-cols-2 !gap-4">
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Providing and Managing Services</h4>
                        <p className="!text-gray-700 !text-sm">To process payments, deliver projects, and manage customer accounts efficiently.</p>
                      </div>
                      <div className="bg-orange-50 p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Marketing and Communication</h4>
                        <p className="!text-gray-700 !text-sm">To share updates, newsletters, offers, and content tailored to your interests.</p>
                      </div>
                      <div className="!bg-orange-50 !p-4 !rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Customer Support</h4>
                        <p className="text-gray-700 text-sm">To respond to inquiries, feedback, and provide post-service assistance.</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Security and Compliance</h4>
                        <p className="text-gray-700 text-sm">To detect and prevent fraudulent activity, maintain data integrity, and meet regulatory obligations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section className="group">
                <div className="flex items-start space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12  !bg-red-50 sm:flex hidden !rounded-xl  !items-center !justify-center group-hover:!bg-red-100 !transition-colors !duration-300">
                    <span className="!text-red-600 !font-semibold !text-lg">🍪</span>
                  </div>
                  <div className="!flex-1 !text-justify">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Cookies and Tracking Technologies
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg">
                      Our website uses cookies to improve functionality, personalize user experiences, and analyze performance metrics. You may choose to disable cookies through your browser settings, though doing so may affect certain features or services.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-indigo-50 !rounded-xl sm:flex hidden  !items-center !justify-center group-hover:!bg-indigo-100 !transition-colors !duration-300">
                    <span className="!text-indigo-600 !font-semibold !text-lg">🤝</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Information Sharing
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mb-4">
                      We may share your personal information in limited and secure ways, including:
                    </p>
                    <ul className="!space-y-3 !text-gray-700">
                      <li className="!flex !items-start">
                        <span className="!text-indigo-500 !mr-2">•</span>
                        With trusted service providers such as payment gateways and hosting partners
                      </li>
                      <li className="!flex !items-start">
                        <span className="!text-indigo-500 !mr-2">•</span>
                         To comply with legal requirements or enforce our terms
                      </li>
                      <li className="!flex !items-start">
                        <span className="!text-indigo-500 !mr-2">•</span>
                          With affiliates or partners for marketing and operational collaboration
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-teal-50 sm:flex hidden  !rounded-xl  !items-center !justify-center group-hover:!bg-teal-100 !transition-colors !duration-300">
                    <span className="!text-teal-600 !font-semibold !text-lg">🔒</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Your Rights and Choices
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg !mb-4">
                      Depending on your location, you may be entitled to the following rights:
                    </p>
                    <div className="!grid md:!grid-cols-2 !gap-4 !mb-6">
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Access & Review:</h4>
                        <p className="!text-gray-700 !text-sm">Request a copy of your personal data we hold</p>
                      </div>
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Correction & Deletion:</h4>
                        <p className="!text-gray-700 !text-sm">Ask for correction or removal of inaccurate data</p>
                      </div>
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Opt-out:</h4>
                        <p className="!text-gray-700 !text-sm"> Unsubscribe from marketing communications at any time</p>
                      </div>
                      <div className="!bg-teal-50 !p-4 !rounded-lg">
                        <h4 className="!font-semibold !text-gray-900 !mb-2">Control:</h4>
                        <p className="!text-gray-700 !text-sm">Adjust cookie preferences and data-sharing permissions</p>
                      </div>
                    </div>
                    <p className="!text-gray-700 !leading-relaxed !text-lg">
                      To exercise these rights, contact us through the details provided below.
                    </p>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section className="!group">
                <div className="!flex !items-start !space-x-4">
                  <div className="!flex-shrink-0 !w-12 !h-12 !bg-gray-50 !rounded-xl sm:flex hidden !items-center !justify-center group-hover:!bg-gray-100 !transition-colors !duration-300">
                    <span className="!text-gray-600 !font-semibold !text-lg">🛡️</span>
                  </div>
                  <div className="!flex-1">
                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
                      Security of Your Information
                    </h3>
                    <p className="!text-gray-700 !leading-relaxed !text-lg">
                      We use advanced security measures, including SSL encryption, restricted access, and secure data storage, to protect your personal information. However, no online transmission is entirely risk-free. We recommend using strong passwords and informing us immediately of any unauthorized activity.
                    </p>
                  </div>
                </div>
              </section>

              {/* Third Party Links */}
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
                      Our website may include links to third-party websites or tools. We are not responsible for their content or privacy practices and encourage you to review their respective privacy policies before providing personal information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
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
                      Our Services are not directed to individuals under the age of 16. If you believe a minor has provided us with personal data, please contact us promptly to request its removal.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Contact Information */}
            <div className="!mt-12 !p-2 !bg-gradient-to-r from-blue-50 to-indigo-50 !rounded-2xl !border !border-blue-200">
              <h3 className="!text-2xl !font-bold !text-gray-900 !mb-6 !text-center">Contact Us</h3>
              <p className="!text-gray-700 !text-lg !text-center !mb-6">
                For questions or concerns regarding this Privacy Policy, reach out to us at:
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