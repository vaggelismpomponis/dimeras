import Link from "next/link";
import { ServiceItem } from "@/data/servicesData";

interface ServiceArchCardProps {
  service: ServiceItem;
  index: number;
  isRevealed: boolean;
}

export default function ServiceArchCard({
  service,
  index,
  isRevealed,
}: ServiceArchCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`service-arch-card reveal reveal-delay-${Math.min(index + 1, 5)}${
        isRevealed ? " visible" : ""
      }`}
    >
      {/* Index + icon column */}
      <div className="sac-top-bar">
        <span className="sac-index" aria-hidden="true">{num}</span>
        <div className="sac-icon-box" aria-hidden="true">
          {service.icon}
        </div>
      </div>

      {/* Content column */}
      <div className="sac-content">
        <h2 className="sac-title">{service.title}</h2>

        {service.desc && <p className="sac-desc">{service.desc}</p>}

        {service.points && service.points.length > 0 && (
          <ul className="sac-points-list">
            {service.points.map((pt, idx) => (
              <li key={idx}>
                <span className="sac-bullet" aria-hidden="true">—</span>
                <span>
                  <strong>{pt.label}</strong> {pt.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="sac-footer">
          <Link
            href={`/contact?type=${encodeURIComponent(service.title)}`}
            className="sac-cta-link"
          >
            Ζητήστε Προσφορά
          </Link>
        </div>
      </div>
    </article>
  );
}
