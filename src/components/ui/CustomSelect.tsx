"use client";

import { useEffect, useRef, useState } from "react";

interface CustomSelectProps {
  name: string;
  id: string;
  options: string[];
  defaultValue: string;
  label: string;
}

export default function CustomSelect({
  name,
  id,
  options,
  defaultValue,
  label,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={wrapperRef}>
      <input type="hidden" name={name} value={selected} id={id} />
      <div
        className={`custom-select-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {selected}
      </div>
      <label htmlFor={id} className="custom-select-label">
        {label}
      </label>
      <div className={`custom-select-dropdown ${isOpen ? "open" : ""}`} role="listbox">
        {options.map((opt) => (
          <div
            key={opt}
            role="option"
            aria-selected={selected === opt}
            className={`custom-select-option ${selected === opt ? "selected" : ""}`}
            onClick={() => {
              setSelected(opt);
              setIsOpen(false);
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

