import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SearchBar({ field, setUrlParam }) {
    const [inputValue, setInputValue] = useState('');

    const onSubmit = async () => {
        if (field === 'Job') {
            setUrlParam(`?searchKey=${inputValue}`)
        }
        if (field === 'Company') {
            setUrlParam(`?searchKey=${inputValue}`)
        }
        if (field === 'Employee') {
            setUrlParam(`?searchKey=${inputValue}`)
        }

        console.log('search:', inputValue)
    }

    return (
        <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
            <input
                className='bg-slate-100 text-black'
                type="text"
                name="search"
                id="search"
                placeholder={`search ${field}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div onClick={onSubmit} className=' border-l-2 custom-input cursor-pointer'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
        </div>
    );
}

export default SearchBar;