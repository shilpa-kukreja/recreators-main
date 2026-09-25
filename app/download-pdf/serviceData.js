// app/download-pdf/serviceData.js

// ============================================================
// 📌 HOW TO UPLOAD YOUR OWN PDFs
// ============================================================
// 1. Drop your PDF into the /public/downloads/ folder
// 2. Set `pdfFile: '/downloads/your-file.pdf'` on the service
// 3. If `pdfFile` is null or empty, the site auto-generates the PDF
// ============================================================

export const brandInfo = {
  name: 'ReCreators',
  subtitle: 'Digital Marketing & Branding Agency',
  tagline:
    "We build main characters, wherever in the world you're trying to be seen.",
  description:
    "ReCreators is the digital marketing agency for brands who refuse to be forgettable. We don't build noise. We build main characters.",
  website: 'www.recreators.in',
  email: 'hello@recreators.in',

  // 👇 Full Capability Deck — set to '/downloads/full-capability-deck.pdf'
  //    or leave null to auto-generate the multi-page deck
  fullDeckPdfFile: null,
};

export const services = [
  {
    id: 'packaging',
    title: 'Packaging',
    shortDesc: 'Packaging that stops the scroll — on shelves and online.',
    longDesc:
      'We design packaging that commands attention the moment it is seen. Every box, label, and unboxing moment is engineered to turn a first impression into a lasting brand memory.',
    color: '#FF5F1F',
    icon: 'box',
    pdfFile: null, // 👈 '/downloads/packaging.pdf' if you have one
    deliverables: [
      'Primary & secondary packaging design',
      'Label, sticker, and seal design',
      'Dieline creation & print-ready files',
      'Unboxing experience design',
      'Sustainable material consultation',
      'Retail shelf impact mockups',
    ],
  },
  {
    id: 'web',
    title: 'Web Development & Design',
    shortDesc: 'Websites engineered to convert, not just exist.',
    longDesc:
      'We build fast, beautiful, and conversion-obsessed websites. Every pixel and interaction is designed to guide visitors toward action — not just to look pretty.',
    color: '#FF5F1F',
    icon: 'code',
    pdfFile: null, // 👈 '/downloads/web-development.pdf'
    deliverables: [
      'Custom UI/UX design',
      'Frontend development (Next.js / React)',
      'Backend & CMS integration',
      'E-commerce solutions',
      'Performance & SEO optimization',
      'Analytics & conversion tracking',
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    shortDesc: 'Rank higher. Get found. Grow organically.',
    longDesc:
      'We engineer search visibility that compounds. From technical audits to content strategy, every move is built to drive qualified organic traffic and lasting rankings.',
    color: '#FF5F1F',
    icon: 'search',
    pdfFile: null, // 👈 '/downloads/seo.pdf'
    deliverables: [
      'Technical SEO audit',
      'Keyword research & strategy',
      'On-page optimization',
      'Content strategy & briefs',
      'Link building & authority',
      'Monthly rank & traffic reporting',
    ],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    shortDesc: 'Campaigns engineered to convert.',
    longDesc:
      'We design and run performance campaigns that turn ad spend into revenue. Every funnel, creative, and audience is tested, measured, and optimized.',
    color: '#FF5F1F',
    icon: 'megaphone',
    pdfFile: null, // 👈 '/downloads/digital-marketing.pdf'
    deliverables: [
      'Paid ads (Meta, Google, LinkedIn)',
      'Funnel & landing page design',
      'Email marketing automation',
      'Conversion rate optimization',
      'Audience research & targeting',
      'Performance dashboards',
    ],
  },
  {
    id: 'brand',
    title: 'Brand Design',
    shortDesc: 'Brand identities people actually remember.',
    longDesc:
      'We craft brands that feel inevitable. From logo systems to full visual language, every element is designed to make your brand impossible to confuse and impossible to forget.',
    color: '#FF5F1F',
    icon: 'palette',
    pdfFile: null, // 👈 '/downloads/brand-design.pdf'
    deliverables: [
      'Logo & wordmark design',
      'Brand guidelines & style guide',
      'Color & typography systems',
      'Visual identity assets',
      'Brand voice & messaging',
      'Collateral design',
    ],
  },
  {
    id: 'photo',
    title: 'Photography & Videography',
    shortDesc: 'Scroll-stopping visuals that sell the story.',
    longDesc:
      'We capture the moments that make brands feel real. Product, lifestyle, and campaign visuals engineered to stop the scroll and drive action.',
    color: '#FF5F1F',
    icon: 'camera',
    pdfFile: null, // 👈 '/downloads/photography.pdf'
    deliverables: [
      'Product photography',
      'Lifestyle & brand shoots',
      'Video production',
      'Reels & short-form content',
      'Post-production & editing',
      'Campaign visual assets',
    ],
  },
  {
    id: 'content',
    title: 'Content Writing',
    shortDesc: 'Words that work — copy that converts.',
    longDesc:
      'We write copy that sounds like your brand and sells like your best salesperson. From website copy to long-form content, every word earns its place.',
    color: '#FF5F1F',
    icon: 'pen',
    pdfFile: null, // 👈 '/downloads/content-writing.pdf'
    deliverables: [
      'Website & landing page copy',
      'Blog & long-form content',
      'Social media captions',
      'Email campaigns',
      'Product descriptions',
      'Brand messaging & tone',
    ],
  },
  {
    id: 'editing',
    title: 'Designing & Editing',
    shortDesc: 'Polished creative that finishes the story.',
    longDesc:
      'We take raw assets and turn them into finished, on-brand creative. From social graphics to video edits, every deliverable is sharp, consistent, and ready to ship.',
    color: '#FF5F1F',
    icon: 'layers',
    pdfFile: null, // 👈 '/downloads/designing-editing.pdf'
    deliverables: [
      'Social media graphics',
      'Video editing & motion',
      'Presentation design',
      'Print & digital assets',
      'Photo retouching',
      'Brand asset templates',
    ],
  },
];

export const approachPoints = [
  {
    title: 'Strategy First',
    desc: 'Every project starts with understanding your brand, audience, and goals — not with templates.',
  },
  {
    title: 'Built to Convert',
    desc: 'We design for outcomes. Every decision is tied to a measurable business result.',
  },
  {
    title: 'Crafted to Last',
    desc: 'We build systems, not one-offs — so your brand scales without losing its identity.',
  },
];