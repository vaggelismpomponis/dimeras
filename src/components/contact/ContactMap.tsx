import { LocationIcon } from "./ContactIcons";

export default function ContactMap() {
  return (
    <div className="contact-map-col">
      <div className="contact-map-header">
        <div className="contact-map-title">
          <LocationIcon />
          <span>Τοποθεσία και Έδρα — Λάρισα</span>
        </div>
      </div>
      <div className="contact-map-frame">
        <iframe
          src="https://maps.google.com/maps?q=Στρατηγού+Φράγκου+26-30,+Λάρισα&t=&z=15&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Τοποθεσία DN GROUP στους Χάρτες Google"
          allowFullScreen
        />
      </div>
    </div>
  );
}

