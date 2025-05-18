import React from "react";
import PropTypes from "prop-types";
import styles from "./input.module.scss";

const Input = ({
  id,
  type = "text",
  label = "",
  placeholder = "",
  message = "",
  error = false,
  field,
  disabled = false,
  options = [],
}) => {
  const inputClassName = `${styles.inputField} ${error ? styles.inputError : ""}`;
  const isDefaultValue = type === "select" && !field.value;

  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      {type === "select" ? (
        <select
          id={id}
          className={`${inputClassName} ${isDefaultValue ? styles.selectDefault : ""}`}
          {...field}
          disabled={disabled}
          data-testid="select"
        >
          {options &&
            options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.name}
          type={type}
          placeholder={placeholder}
          className={inputClassName}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          disabled={disabled}
          data-testid="input"
          accept={type === "file" ? field.accept : undefined}
        />
      )}
      <span className={styles.errorMessage}>{message || "\u00A0"}</span>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "email", "select"]),
  placeholder: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.bool,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
  }).isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ),
};

export default Input;
