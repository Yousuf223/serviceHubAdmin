

import * as React from "react";

import { cn } from "@/lib/utils";

const TextErea = ({ className, type, name, inputStyle, show=false, register, errors, ...props }) => {
  console.log('input',inputStyle)
  return (
    <div className="flex  flex-col gap-2">
      <textarea  
        type={type}
        {...(register && register(name))}
        className={cn(
          `flex h-9 w-full focus:outline-none  rounded-md text-white  px-3 py-1 text-sm shadow-sm  file:bg-transparent file:text-sm file:font-medium ${inputStyle}`,
          className
        )}
        {...props}
       
        
      />

      {show && errors && errors[name] && (
        <span className="ml-2 text-red-500 text-xs self-start">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

TextErea.displayName = "TextErea";

export { TextErea };
