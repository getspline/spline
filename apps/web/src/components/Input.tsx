import type { InputHTMLAttributes, ReactNode } from "react";
import "./Input.css";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    label?: string;
    error?: string;
    startIcon?: ReactNode;
    endAdornment?: ReactNode;
    wrapperClassName?: string;
};

export function Input({
    id,
    label,
    error,
    startIcon,
    endAdornment,
    wrapperClassName,
    className,
    disabled,
    ...props
}: InputProps) {
    const inputId = id ?? props.name;
    const errorId = inputId ? `${inputId}-error` : undefined;

    return (
        <div className={wrapperClassName}>
            {label && (
                <label className="input-label" htmlFor={inputId}>
                    {label}
                </label>
            )}

            <div
                className={[
                    "input-wrapper",
                    error && "input-wrapper--error",
                    disabled && "input-wrapper--disabled",
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {startIcon && (
                    <span className="input-start-icon" aria-hidden="true">
                        {startIcon}
                    </span>
                )}

                <input
                    {...props}
                    id={inputId}
                    disabled={disabled}
                    className={"input-field"}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : props["aria-describedby"]}
                />

                {endAdornment && <span className="input-end-adornment">{endAdornment}</span>}
            </div>

            {error && (
                <p className="input-error" id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
}
