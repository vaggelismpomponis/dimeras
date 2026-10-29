"use client";

interface SliderQuickPillsProps {
  activeTab: "slider" | "before" | "after";
  onSelectTab: (tab: "slider" | "before" | "after") => void;
}

export default function SliderQuickPills({
  activeTab,
  onSelectTab,
}: SliderQuickPillsProps) {
  return (
    <div className="ba-quick-pills" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className={`ba-pill ${activeTab === "before" ? "active" : ""}`}
        onClick={() => onSelectTab("before")}
        title="Προβολή Αρχικής Κατάστασης (Πριν)"
      >
        Πριν
      </button>
      <button
        type="button"
        className={`ba-pill ${activeTab === "slider" ? "active" : ""}`}
        onClick={() => onSelectTab("slider")}
        title="Σύγκριση 50/50 (Σύρετε τη μπάρα)"
      >
        Πριν / Μετά
      </button>
      <button
        type="button"
        className={`ba-pill ${activeTab === "after" ? "active" : ""}`}
        onClick={() => onSelectTab("after")}
        title="Προβολή Ολοκληρωμένου Έργου (Μετά)"
      >
        Μετά
      </button>
    </div>
  );
}

