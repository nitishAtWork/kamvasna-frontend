"use client";

import { forwardRef, useState } from "react";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Input = forwardRef(function Input(
  {
    label,
    error,
    required = false,
    className = "",
    type = "text",
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword =
    type === "password";

  const inputType =
    isPassword && showPassword
      ? "text"
      : type;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          {...props}
          type={inputType}
          required={required}
          className={`h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100 ${
            isPassword
              ? "pr-12"
              : ""
          } ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() =>
              setShowPassword(
                (current) => !current
              )
            }
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <FiEyeOff size={18} />
            ) : (
              <FiEye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;