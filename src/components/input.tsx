import React from "react";

type InputProps = {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean; // pour le bouton voir/masquer mot de passe
  onToggle?: () => void;
  toggleState?: boolean;
};

export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  showToggle = false,
  onToggle,
  toggleState = false,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      <div className="relative">
        <input type={showToggle && toggleState ? "text" : type} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full border border-black rounded px-3 py-2 pr-16 focus:outline-none focus:ring focus:ring-blue-300"/>
        {showToggle && onToggle && (
          <button type="button"  onClick={onToggle} className="absolute right-2 top-2 text-blue-500 text-sm">
            {toggleState ? "Masquer" : "Voir"}
          </button>
        )}
      </div>
    </div>
  );
}
