import React from "react";
import PropTypes from "prop-types";
import styles from "./button.module.scss";

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "medium",
  className = "",
  fullWidth=false,
}) => {
  const buttonClassName = `${className} ${styles.button} ${styles[`variant-${variant}`]} ${styles[`size-${size}`]} ${
    fullWidth ? styles.fullWidth : ""
  }`.trim();

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-testid="button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "transparent"]).isRequired,
  size: PropTypes.oneOf(["x-small", "small", "medium", "large"]).isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Button;