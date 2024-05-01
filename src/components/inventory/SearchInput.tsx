"use client"
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [value, setValue] = useState('');

    const hidePlaceholder = () => setShowPlaceholder(!showPlaceholder);
    const updateValue = (e:any)  => setValue(e.currentTarget.value);

    return (
        <div className="flex justify-center h-[35px]" style={{ position: 'relative' }}>
            {showPlaceholder &&!value && (
                <div className="p-2 h-full w-full flex items-center text-[#55597D]" style={{ position: 'absolute', top: 0, pointerEvents: 'none' }}>
                    <span className="flex items-center justify-center w-3 h-3 mr-[5px]"><CiSearch/></span> 
                    <span className="text-xs font-medium">Search...</span>
                </div>
            )}
            <input
                onFocus={hidePlaceholder}
                onBlur={() => setShowPlaceholder(true)}
                onChange={updateValue}
                className="p-2.5 flex w-[235px] justify-between items-center rounded bg-[#262935] border border-solid border-[#393E4F]"
                type="text"
                name=""
                id=""
                placeholder=""
            />
        </div>
    );
};

export default SearchInput;
