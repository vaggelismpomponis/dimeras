import Link from "next/link";
import { ServiceItem } from "@/data/servicesData";

interface ServiceHomeRowProps {
  service: ServiceItem;
  index: number;
  isRevealed: boolean;
}

export default function ServiceHomeRow({
  service,
  index,
  isRevealed,
}: ServiceHomeRowProps) {
  return (
    <Link
      href="/services"
      className={`service-home-row reveal reveal-delay-${index + 1}${
        isRevealed ? " visible" : ""
      }`}
    >
      <div className="shr-title-col">
        <div className="shr-icon-box" aria-hidden="true">
          {service.icon}
        </div>
        <h3 className="shr-title">{service.title}</h3>
      </div>

      <div className="shr-desc-col">
        {service.desc && <p className="shr-desc">{service.desc}</p>}
        {service.points && service.points.length > 0 && (
          <ul className="shr-points-list">
            {service.points.map((pt, idx) => (
              <li key={idx}>
                <span className="shr-bullet" aria-hidden="true">•</span>
                <span>
                  <strong>{pt.label}</strong> {pt.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="shr-action-col" aria-hidden="true">
        <span className="shr-arrow-btn">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

