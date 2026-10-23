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
  title: "DN GROUP - Δημεράς Κατασκευαστική — Κατασκευαστική Εταιρεία Λάρισα",
  description:
    "Η DN GROUP - Δημεράς Κατασκευαστική αναλαμβάνει νέες κατασκευές, ανακαινίσεις και τεχνικά έργα στη Λάρισα. Εμπειρία από το 2006.",
  keywords: [
    "κατασκευαστική εταιρεία Λάρισα",
    "ανακαίνιση σπιτιού Λάρισα",
    "νεόδμητα κτίρια Λάρισα",
    "τεχνική εταιρεία Λάρισα",
    "κατασκευές Θεσσαλία",
    "εργολάβος Λάρισα",
    "DN GROUP",
    "ΔΗΜΕΡΑΣ",
  ],
  authors: [{ name: "DN GROUP — ΔΗΜΕΡΑΣ Ε.Ε." }],
  openGraph: {
    title: "DN GROUP | Κατασκευαστική Εταιρεία Λάρισα",
    description:
      "Νέες κατασκευές, ανακαινίσεις, τεχνικά έργα — Εμπειρία από το 2006",
    url: SITE_URL,
    siteName: "DN GROUP",
    locale: "el_GR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DN GROUP — Κατασκευαστική Εταιρεία Λάρισα",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DN GROUP | Κατασκευαστική Εταιρεία Λάρισα",
    description:
      "Νέες κατασκευές, ανακαινίσεις, τεχνικά έργα — Εμπειρία από το 2006",
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
      { url: "/icon.svg?v=4", type: "image/svg+xml" },
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/icon-48.png?v=4", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png?v=4", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png?v=4", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=4", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=4",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://schema.org/GeneralContractor",
  name: "DN GROUP — ΔΗΜΕΡΑΣ Ε.Ε.",
  legalName: "ΔΗΜΕΡΑΣ Ε.Ε.",
  foundingDate: "2006",
  description:
    "Κατασκευαστική και Τεχνική Εταιρεία στη Λάρισα. Νέες κατασκευές, ανακαινίσεις, τεχνικά έργα.",
  url: SITE_URL,
  telephone: "+306981772698",
  email: "info@dimeras.gr",
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
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "39.6362",
      longitude: "22.4203",
    },
    geoRadius: "50000",
  },
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
