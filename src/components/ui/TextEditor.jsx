/** @format */

import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { Controller } from "react-hook-form";
export default function TextEdittor({
  register,
  control,
  name,
  errors,
  newClass,
  customClass,
  label,
  required,
  customClassInp,
  value,
}) {
  
  return (
    <div
      className={
        newClass
          ? newClass
          : `${customClass} mt-4 px-4 relative py-2 `
      }
    >
      <div
        className={`flex flex-col gap-4 ${customClassInp} `}
      >
        <Controller
          name={name}
          value={value}
          control={control}
          rules={{ required: "Content is required." }}
          render={({ field }) => (
            <Editor
              id={field.name}
              value={value}
              onTextChange={(e) => field.onChange(e.htmlValue)}
              {...register(name)}
              style={{ height: "320px", }}
            />
          )}
        />

{required && (
            <span className="text-red-500 absolute text-xl top-0 -left-3">
              *
            </span>
          )}
          {errors && errors[name]?.message && (
            <span className="ml-2 text-red-500 text-xs self-start">
              {errors[name]?.message}
            </span>
          )}
      </div>
    </div>
  );
}
