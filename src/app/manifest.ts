import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DN GROUP — Δημεράς Κατασκευαστική',
    short_name: 'DN GROUP',
    description:
      'Κατασκευαστική και Τεχνική Εταιρεία στη Λάρισα. Νέες κατασκευές, ανακαινίσεις, τεχνικά έργα.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d12',
    theme_color: '#c9a84e',
    icons: [
      {
        src: '/icon-192.png?v=5',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png?v=5',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png?v=5',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
