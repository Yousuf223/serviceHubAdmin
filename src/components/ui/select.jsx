import React from 'react';

export function MultiSelect({
    id,
    name,
    register,
    errors,
    options,
    defaultValue,
    ...rest
}) {
    return (
        <select
            id={id}
            name={name}
            {...register(name)}
            multiple={true}
            className={`w-full p-3 border border-[#727272] rounded-md focus:outline-none focus:ring focus:ring-[#007bff] ${errors[name] ? 'border-red-500' : ''}`}
            {...rest}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label || option.value}
                </option>
            ))}
        </select>
    );
}
