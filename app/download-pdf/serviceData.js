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
    shortDesc: 'Packaging that sells, on shelves and online.',
    longDesc:
      'We design packaging that commands attention the moment it is seen. Every box, label, and unboxing moment is engineered to turn a first impression into a lasting brand memory.',
    color: '#FF5F1F',
    icon: 'box',
    pdfFile: null, // 👈 '/downloads/packaging.pdf' if you have one
    deliverables: [
      'Flexible, rigid & folding packaging',
      'Labels, stickers & dieline files',
      'E-commerce & gifting packaging',
    
    ],
  },
  {
    id: 'web',
    title: 'Web Development & Design',
    shortDesc: ' Websites built to convert, not just exist.',
    longDesc:
      'We build fast, beautiful, and conversion-obsessed websites. Every pixel and interaction is designed to guide visitors toward action — not just to look pretty.',
    color: '#FF5F1F',
    icon: 'code',
    pdfFile: null, // 👈 '/downloads/web-development.pdf'
    deliverables: [
      'UI/UX & custom web design',
      'Next.js / React development',
      'Ecommerce, portals & CRM',
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    shortDesc: 'Rankings that bring in customers.',
    longDesc:
      'We engineer search visibility that compounds. From technical audits to content strategy, every move is built to drive qualified organic traffic and lasting rankings.',
    color: '#FF5F1F',
    icon: 'search',
    pdfFile: null, // 👈 '/downloads/seo.pdf'
    deliverables: [
      'Technical & on-page SEO',
      'Keyword research & local SEO',
      'Analytics & reporting',
    ],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    shortDesc: 'Campaigns built to sell, not just show up.',
    longDesc:
      'We design and run performance campaigns that turn ad spend into revenue. Every funnel, creative, and audience is tested, measured, and optimized.',
    color: '#FF5F1F',
    icon: 'megaphone',
    pdfFile: null, // 👈 '/downloads/digital-marketing.pdf'
    deliverables: [
      'Meta, Google & PPC ads',
      'Social media & influencer marketing',
      'Amazon, Flipkart & email marketing',
    ],
  },
  {
    id: 'brand',
    title: 'Brand Design',
    shortDesc: ' Brands people remember, not just recognise.',
    longDesc:
      'We craft brands that feel inevitable. From logo systems to full visual language, every element is designed to make your brand impossible to confuse and impossible to forget.',
    color: '#FF5F1F',
    icon: 'palette',
    pdfFile: null, // 👈 '/downloads/brand-design.pdf'
    deliverables: [
      'Brand naming & logo design',
      'Brand identity & guidelines',
      'Catalogues & company profiles',
    ],
  },
  {
    id: 'photo',
    title: 'Photography & Videography',
    shortDesc: ' Visuals that stop the scroll.',
    longDesc:
      'We capture the moments that make brands feel real. Product, lifestyle, and campaign visuals engineered to stop the scroll and drive action.',
    color: '#FF5F1F',
    icon: 'camera',
    pdfFile: null, // 👈 '/downloads/photography.pdf'
    deliverables: [
      'Product & corporate shoots',
      'Model & ad video shoots',
      'Motion graphics',
    ],
  },
  {
    id: 'content',
    title: 'Content Writing',
    shortDesc: ' Words that get read and ranked.',
    longDesc:
      'We write copy that sounds like your brand and sells like your best salesperson. From website copy to long-form content, every word earns its place.',
    color: '#FF5F1F',
    icon: 'pen',
    pdfFile: null, // 👈 '/downloads/content-writing.pdf'
    deliverables: [
      'SEO & website content',
      'Blogs & product descriptions',
      'Ad copy, taglines & emails',
    ],
  },
  {
    id: 'editing',
    title: 'Designing & Editing',
    shortDesc: 'Creative that gets noticed and used.',
    longDesc:
      'We take raw assets and turn them into finished, on-brand creative. From social graphics to video edits, every deliverable is sharp, consistent, and ready to ship.',
    color: '#FF5F1F',
    icon: 'layers',
    pdfFile: null, // 👈 '/downloads/designing-editing.pdf'
    deliverables: [
      'Graphic & social media design',
      'Video & reels editing',
      'PPT, infographic & thumbnail design',

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