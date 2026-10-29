import { PersonIcon, PhoneIcon, EmailIcon, LocationIcon, ClockIcon } from "./ContactIcons";

export default function ContactDetailsPanel() {
  return (
    <div className="contact-panel">
      <div className="contact-panel-title">Στοιχεία επικοινωνίας</div>

      <div className="contact-panel-items">
        <div className="contact-panel-item">
          <PersonIcon />
          <div>
            <small>ΔΙΟΙΚΗΣΗ &amp; ΕΠΙΒΛΕΨΗ</small>
            <span>Νικόλαος Δημεράς</span>
          </div>
        </div>

        <div className="contact-panel-item">
          <PhoneIcon />
          <div>
            <small>ΤΗΛΕΦΩΝΟ</small>
            <a href="tel:+306981772698">698 177 2698</a>
          </div>
        </div>

        <div className="contact-panel-item">
          <EmailIcon />
          <div>
            <small>EMAIL</small>
            <a href="mailto:info@dimeras.gr">info@dimeras.gr</a>
          </div>
        </div>

        <div className="contact-panel-item">
          <LocationIcon />
          <div>
            <small>ΕΔΡΑ</small>
            <a
              href="https://maps.google.com/?q=Στρατηγού+Φράγκου+26-30,+Λάρισα"
              target="_blank"
              rel="noopener noreferrer"
            >
              Στρατηγού Φράγκου 26–30
              <br />
              Λάρισα 41222
            </a>
          </div>
        </div>

        <div className="contact-panel-item">
          <ClockIcon />
          <div>
            <small>ΩΡΑΡΙΟ</small>
            <span>Δευτ – Παρ, 08:00 – 18:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

