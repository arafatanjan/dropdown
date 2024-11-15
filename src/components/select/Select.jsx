import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

const Select = ({ options, isMulti = false, isSearchable = false, placeholder = "Select...", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : null);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    if (isMulti) {
      const updatedSelection = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(updatedSelection);
      onChange && onChange(updatedSelection);
    } else {
      setSelectedOptions(option);
      onChange && onChange(option);
      closeDropdown();
    }
  };

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="select-container" ref={selectRef}>
      <div className="select-input" onClick={toggleDropdown}>
        <span>
          {isMulti
            ? selectedOptions.length > 0
              ? selectedOptions.map((opt) => opt.label).join(', ')
              : placeholder
            : selectedOptions
            ? selectedOptions.label
            : placeholder}
        </span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="select-dropdown">
          {isSearchable && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="select-search"
            />
          )}
          <ul className="select-options">
            {filteredOptions?.map((option) => (
              <li
                key={option.value}
                className={`select-option ${
                  Array.isArray(selectedOptions) && selectedOptions.includes(option) ? 'selected' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
