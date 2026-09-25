// app/download-pdf/PDFDownloadButton.jsx
'use client';

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { brandInfo, services, approachPoints } from './serviceData';

// ---------- PDF STYLES (WHITE) ----------
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#111111',
    fontSize: 10,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  brandBar: { width: 4, height: 18, marginRight: 8, borderRadius: 2 },
  brandName: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#111111',
  },
  serviceTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    marginBottom: 8,
    color: '#0A0A0A',
  },
  tagline: { fontSize: 13, fontStyle: 'italic', marginBottom: 22 },
  divider: { height: 1, backgroundColor: '#E5E5E5', marginBottom: 20 },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  body: {
    fontSize: 10.5,
    lineHeight: 1.7,
    color: '#404040',
    marginBottom: 22,
  },
  grid2: { flexDirection: 'row', flexWrap: 'wrap' },
  bulletItem: {
    width: '50%',
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 10,
  },
  bulletDot: { width: 4, height: 4, borderRadius: 2, marginTop: 6, marginRight: 8 },
  bulletText: { fontSize: 9.5, color: '#333333', lineHeight: 1.5, flex: 1 },
  approachItem: { marginBottom: 12, paddingLeft: 12, borderLeftWidth: 2 },
  approachTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0A0A0A',
    marginBottom: 3,
  },
  approachDesc: { fontSize: 9, color: '#666666', lineHeight: 1.5 },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    paddingTop: 10,
    fontSize: 8,
    color: '#888888',
    letterSpacing: 0.5,
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
    color: '#0A0A0A',
    marginTop: 40,
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 24,
    lineHeight: 1.6,
  },
  coverTagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#FF5F1F',
    marginBottom: 36,
    lineHeight: 1.5,
  },
  coverGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  coverCard: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    padding: 12,
    marginBottom: 10,
    marginRight: '2%',
    borderRadius: 4,
    borderLeftWidth: 3,
  },
  coverCardTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0A0A0A',
    marginBottom: 3,
  },
  coverCardDesc: { fontSize: 8.5, color: '#666666', lineHeight: 1.4 },
});

// ---------- SINGLE SERVICE PDF ----------
const ServicePDF = ({ service }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.brandRow}>
        <View style={[pdfStyles.brandBar, { backgroundColor: service.color }]} />
        <Text style={pdfStyles.brandName}>{brandInfo.name}</Text>
      </View>

      <Text style={pdfStyles.serviceTitle}>{service.title}</Text>
      <Text style={[pdfStyles.tagline, { color: service.color }]}>
        {service.shortDesc}
      </Text>

      <View style={pdfStyles.divider} />
      <Text style={pdfStyles.body}>{service.longDesc}</Text>

      <Text style={[pdfStyles.sectionTitle, { color: service.color }]}>
        What's Included
      </Text>
      <View style={pdfStyles.grid2}>
        {service.deliverables.map((item, i) => (
          <View key={i} style={pdfStyles.bulletItem}>
            <View
              style={[pdfStyles.bulletDot, { backgroundColor: service.color }]}
            />
            <Text style={pdfStyles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 18 }} />

      <Text style={[pdfStyles.sectionTitle, { color: service.color }]}>
        Our Approach
      </Text>
      {approachPoints.map((point, i) => (
        <View
          key={i}
          style={[pdfStyles.approachItem, { borderLeftColor: service.color }]}
        >
          <Text style={pdfStyles.approachTitle}>{point.title}</Text>
          <Text style={pdfStyles.approachDesc}>{point.desc}</Text>
        </View>
      ))}

      <View style={pdfStyles.footer}>
        <Text>
          {brandInfo.name} — {brandInfo.subtitle}
        </Text>
        <Text>
          {brandInfo.website} · {brandInfo.email}
        </Text>
      </View>
    </Page>
  </Document>
);

// ---------- FULL CAPABILITY DECK PDF ----------
const FullDeckPDF = () => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.brandRow}>
        <View style={[pdfStyles.brandBar, { backgroundColor: '#FF5F1F' }]} />
        <Text style={pdfStyles.brandName}>{brandInfo.name}</Text>
      </View>

      <Text style={pdfStyles.coverTitle}>Capability{'\n'}Deck</Text>
      <Text style={pdfStyles.coverSubtitle}>{brandInfo.description}</Text>
      <Text style={pdfStyles.coverTagline}>"{brandInfo.tagline}"</Text>

      <Text style={[pdfStyles.sectionTitle, { color: '#FF5F1F' }]}>
        Our Services
      </Text>
      <View style={pdfStyles.coverGrid}>
        {services.map((service) => (
          <View
            key={service.id}
            style={[pdfStyles.coverCard, { borderLeftColor: service.color }]}
          >
            <Text style={pdfStyles.coverCardTitle}>{service.title}</Text>
            <Text style={pdfStyles.coverCardDesc}>{service.shortDesc}</Text>
          </View>
        ))}
      </View>

      <View style={pdfStyles.footer}>
        <Text>
          {brandInfo.name} — {brandInfo.subtitle}
        </Text>
        <Text>
          {brandInfo.website} · {brandInfo.email}
        </Text>
      </View>
    </Page>

    {services.map((service) => (
      <Page key={service.id} size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.brandRow}>
          <View
            style={[pdfStyles.brandBar, { backgroundColor: service.color }]}
          />
          <Text style={pdfStyles.brandName}>{brandInfo.name}</Text>
        </View>

        <Text style={pdfStyles.serviceTitle}>{service.title}</Text>
        <Text style={[pdfStyles.tagline, { color: service.color }]}>
          {service.shortDesc}
        </Text>

        <View style={pdfStyles.divider} />
        <Text style={pdfStyles.body}>{service.longDesc}</Text>

        <Text style={[pdfStyles.sectionTitle, { color: service.color }]}>
          What's Included
        </Text>
        <View style={pdfStyles.grid2}>
          {service.deliverables.map((item, i) => (
            <View key={i} style={pdfStyles.bulletItem}>
              <View
                style={[pdfStyles.bulletDot, { backgroundColor: service.color }]}
              />
              <Text style={pdfStyles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 18 }} />

        <Text style={[pdfStyles.sectionTitle, { color: service.color }]}>
          Our Approach
        </Text>
        {approachPoints.map((point, i) => (
          <View
            key={i}
            style={[pdfStyles.approachItem, { borderLeftColor: service.color }]}
          >
            <Text style={pdfStyles.approachTitle}>{point.title}</Text>
            <Text style={pdfStyles.approachDesc}>{point.desc}</Text>
          </View>
        ))}

        <View style={pdfStyles.footer}>
          <Text>
            {brandInfo.name} — {brandInfo.subtitle}
          </Text>
          <Text>
            {brandInfo.website} · {brandInfo.email}
          </Text>
        </View>
      </Page>
    ))}
  </Document>
);

// ---------- SHARED ICON ----------
const DownloadIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// Helper: sanitize filename
const makeFileName = (title) =>
  `ReCreators-${title.replace(/[^a-zA-Z0-9]+/g, '-')}-Deck.pdf`;

// ============================================================
// SMART SERVICE BUTTON — uses uploaded PDF if available,
// otherwise auto-generates one
// ============================================================
export function ServicePDFButton({ service }) {
  const fileName = makeFileName(service.title);
  const buttonClasses =
    '!inline-flex !items-center !justify-center !gap-2 !w-full !px-4 !py-2.5 !rounded-lg !text-sm !font-semibold !text-white !transition-all !duration-200 hover:!brightness-110 !cursor-pointer';
  const buttonStyle = {
    backgroundColor: service.color,
    boxShadow: `0 4px 18px ${service.color}33`,
  };

  // ✅ If an uploaded PDF exists, just link to it
  if (service.pdfFile) {
    return (
      <a
        href={service.pdfFile}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        style={buttonStyle}
      >
        <DownloadIcon />
        Download PDF
      </a>
    );
  }

  // ⚙️ Otherwise, auto-generate the PDF
  return (
    <PDFDownloadLink
      document={<ServicePDF service={service} />}
      fileName={fileName}
      className={buttonClasses}
      style={buttonStyle}
    >
      {({ loading }) => (
        <>
          <DownloadIcon />
          {loading ? 'Preparing…' : 'Download PDF'}
        </>
      )}
    </PDFDownloadLink>
  );
}

// ============================================================
// SMART FULL DECK BUTTON
// ============================================================
export function FullDeckPDFButton() {
  const buttonClasses =
    '!inline-flex !items-center !justify-center !gap-3 !px-8 !py-4 !rounded-xl !bg-[#FF5F1F] hover:!brightness-110 !text-white !font-bold !text-base !transition-all !duration-300 !shadow-lg !shadow-[#FF5F1F]/30 hover:!-translate-y-0.5 !cursor-pointer';

  // ✅ Uploaded full deck
  if (brandInfo.fullDeckPdfFile) {
    return (
      <a
        href={brandInfo.fullDeckPdfFile}
        download="ReCreators-Full-Capability-Deck.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <DownloadIcon size={20} />
        Download Full Capability Deck
      </a>
    );
  }

  // ⚙️ Auto-generated
  return (
    <PDFDownloadLink
      document={<FullDeckPDF />}
      fileName="ReCreators-Full-Capability-Deck.pdf"
      className={buttonClasses}
    >
      {({ loading }) => (
        <>
          <DownloadIcon size={20} />
          {loading ? 'Preparing Full Deck…' : 'Download Full Capability Deck'}
        </>
      )}
    </PDFDownloadLink>
  );
}