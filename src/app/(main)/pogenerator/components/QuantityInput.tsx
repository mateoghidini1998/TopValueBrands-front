import React, { useState } from 'react';

type NumberInputProps = {
  value: number;
  onChange?: (newValue: number) => void;
};

export const NumberInput = ({ value }: NumberInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setInputValue(newValue);
  };

  return (
    <div className="flex items-center dark:bg-dark dark:text-white">
      {/* <button onClick={handleDecrement} className="px-2">-</button> */}
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        className="text-center mx-auto border border-gray-300 rounded dark:bg-dark dark:text-white"
        style={{ width: '50px' , height: '30px'}}
      />
      {/* <button onClick={handleIncrement} className="px-2">+</button> */}
    </div>
  );
};
