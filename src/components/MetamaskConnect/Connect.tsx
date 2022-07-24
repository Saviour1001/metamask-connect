import React from "react";

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  function handleClick() {
    console.log("Button clicked");
  }

  return <button onClick={handleClick}>{props.label}</button>;
};

export default Button;
