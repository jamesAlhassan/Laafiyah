import React, { useState } from 'react';
import './MultipleValueField.css'

function MultipleValueFieldData({ name, values, setValues }) {
    const [inputValue, setInputValue] = useState('');

    const handleAddValue = () => {
        if (inputValue.trim() !== '') {
            setValues([...values, inputValue]);
            setInputValue('');
        }
    };

    const handleRemoveValue = (valueToRemove) => {
        const updatedValues = values.filter((value) => value !== valueToRemove);
        setValues(updatedValues);
    };

    return (
        <div className="multiple-value-field">
            <div className='input-section'>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Add ${name}`}
                />
                <button type="button" onClick={handleAddValue}>
                    Add
                </button>
            </div>
            <ul>
                {values.map((value, index) => (
                    <li key={index}>
                        {value}
                        <button type="button" onClick={() => handleRemoveValue(value)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MultipleValueFieldData;
