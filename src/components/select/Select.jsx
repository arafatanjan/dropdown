

import React, { useState, useEffect, useRef } from 'react';
import './Select.css';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  multiple = false,
  searchable = false,
  placeholder = 'Select...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState(multiple ? [] : null);

  const dropdownRef = useRef(null);

  
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (multiple) {
      const isSelected = selectedValue.includes(option);
      const updatedValue = isSelected
        ? selectedValue.filter((item) => item !== option)
        : [...selectedValue, option];
      setSelectedValue(updatedValue);
      onChange && onChange(updatedValue);
    } else {
      setSelectedValue(option);
      onChange && onChange(option);
      setIsOpen(false);
    }
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSelectedValue = () => {
    if (multiple) {
      return selectedValue.length > 0
        ? selectedValue.map((item) => item.label).join(', ')
        : placeholder;
    }
    return selectedValue ? selectedValue.label : placeholder;
  };

  return (
    <div className="select-container" ref={dropdownRef}>
      {label && <label className="select-label">{label}</label>}
      <div className="select-display" onClick={toggleDropdown}>
        <span>{renderSelectedValue()}</span>
        <span className="select-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="select-dropdown">
          {searchable && (
            <input
              type="text"
              className="select-search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          )}
          <ul className="select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`select-option ${
                    multiple
                      ? selectedValue.includes(option)
                        ? 'selected'
                        : ''
                      : selectedValue === option
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="select-no-options">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
