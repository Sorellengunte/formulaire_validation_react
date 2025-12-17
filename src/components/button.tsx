import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "danger";
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const styles = {
    primary: "btn-primary",
    danger: "btn-danger",
  };

  return (
    <button type={type} onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
}
