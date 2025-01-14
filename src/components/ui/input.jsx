// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Input = React.forwardRef(({ className, type, name, register, errors, ...props }, ref) => {
//   console.log(errors)
//   console.log(name)
//   console.log({...register(name)},"register")
//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         type={type}
//         {...register(name)}
//         className={cn(
//           "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//           className
//         )}
//         ref={ref}
//         {...props} />
        
//         {errors && errors[name]?.message && (
//             <span className="ml-2 text-red-500 text-xs">
//               {errors[name]?.message}
//             </span>
//           )}
//     </div>
    
//   );
// })
// Input.displayName = "Input"

// export { Input }

import * as React from "react"

import { cn } from "@/lib/utils"

const Input = ({ className, type, name, register, errors, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <input 
        type={type}
        {...(register && register(name))}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props} />
        
        {errors && errors[name] && (
          <span className="ml-2 text-red-500 text-xs self-start">
            {errors[name].message}
          </span>
        )}
    </div>
  );
}

Input.displayName = "Input"

export { Input }
