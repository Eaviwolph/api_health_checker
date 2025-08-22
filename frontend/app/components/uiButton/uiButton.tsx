import React from "react";

import "./uiButton.css";

export enum ButtonVariant {
  Blue = "blue",
  Green = "green",
  Red = "red",
  White = "white",
}

export function UiButton(props: {
  text: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick: () => void;
  type?: string;
}) {
  const {
    text,
    variant = ButtonVariant.Blue,
    disabled = false,
    onClick,
    type = "button",
  } = props;

  return (
    <button
      className={`ui-button ui-button--${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
