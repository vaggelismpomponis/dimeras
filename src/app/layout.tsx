import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const SITE_URL = "https://www.dimeras.gr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε. | Ριζικές Ανακαινίσεις και Ολοκληρωμένα Ιδιωτικά Έργα",
  description:
    "Η DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε. είναι ανεξάρτητη τεχνική & κατασκευαστική εταιρεία με έδρα τη Λάρισα, υπό τη διοίκηση του Νικολάου Δημερά. Ριζικές ανακαινίσεις, ανακατασκευές κτιρίων και ανέγερση νέων ιδιωτικών έργων σε Λάρισα, Θεσσαλία και Αττική από το 2006.",
  keywords: [
    "DN GROUP ΔΗΜΕΡΑΣ Ε.Ε.",
    "Νικόλαος Δημεράς",
    "ριζικές ανακαινίσεις Λάρισα",
    "ανακαίνιση διαμερίσματος Λάρισα",
    "ανακατασκευές κτιρίων Λάρισα",
    "ανακαινίσεις επενδυτικών ακινήτων",
    "ανακατασκευές πολυκατοικιών",
    "ανέγερση ιδιωτικών κτιρίων",
    "κατασκευαστική εταιρεία Λάρισα",
    "τεχνική εταιρεία Λάρισα",
    "κατασκευές Θεσσαλία",
    "κατασκευαστική Αττική",
  ],
  authors: [{ name: "DN GROUP — ΔΗΜΕΡΑΣ Ε.Ε." }],
  openGraph: {
    title: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε. | Ριζικές Ανακαινίσεις και Ιδιωτικά Κατασκευαστικά Έργα",
    description:
      "Ανεξάρτητη τεχνική και κατασκευαστική εταιρεία με έδρα τη Λάρισα υπό τη διοίκηση του Νικολάου Δημερά. Εμπειρία στον κλάδο από το 2006 σε Λάρισα, Θεσσαλία και Αττική.",
    url: SITE_URL,
    siteName: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε.",
    locale: "el_GR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε. | Ριζικές Ανακαινίσεις και Ολοκληρωμένα Ιδιωτικά Έργα",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε. | Ριζικές Ανακαινίσεις και Ιδιωτικά Κατασκευαστικά Έργα",
    description:
      "Ανεξάρτητη τεχνική και κατασκευαστική εταιρεία με έδρα τη Λάρισα υπό τη διοίκηση του Νικολάου Δημερά. Εμπειρία από το 2006.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg?v=5", type: "image/svg+xml" },
      { url: "/favicon.ico?v=5", sizes: "any" },
      { url: "/icon-48.png?v=5", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png?v=5", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png?v=5", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=5", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=5",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://schema.org/GeneralContractor",
  name: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε.",
  legalName: "ΔΗΜΕΡΑΣ Ε.Ε.",
  alternateName: "DN GROUP",
  foundingDate: "2006",
  description:
    "Ανεξάρτητη τεχνική και κατασκευαστική εταιρεία με έδρα τη Λάρισα υπό τη διοίκηση του Νικολάου Δημερά. Ριζικές ανακαινίσεις κατοικιών, ανακατασκευές κτιρίων, ανακαινίσεις επενδυτικών ακινήτων και ανέγερση νέων ιδιωτικών κτιρίων σε Λάρισα, Θεσσαλία και Αττική.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  telephone: "+306981772698",
  email: "info@dimeras.gr",
  founder: {
    "@type": "Person",
    name: "Νικόλαος Δημεράς",
    jobTitle: "Διαχειριστής & Τεχνικός Υπεύθυνος",
    worksFor: {
      "@type": "Organization",
      name: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε.",
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Στρατηγού Φράγκου 26-30",
    addressLocality: "Λάρισα",
    addressRegion: "Θεσσαλία",
    postalCode: "41222",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "39.6362",
    longitude: "22.4203",
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Λάρισα",
    },
    {
      "@type": "AdministrativeArea",
      name: "Θεσσαλία",
    },
    {
      "@type": "AdministrativeArea",
      name: "Αττική",
    },
  ],
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: "€€",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
