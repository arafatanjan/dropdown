
import React, { useState } from 'react';
import './Home.css';
import Select from '../components/select/Select';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

function Home() {
  const [singleValue, setSingleValue] = useState(null);
  const [multiValue, setMultiValue] = useState([]);

  const handleSingleChange = (value) => {
    setSingleValue(value);
    console.log('Single Select Value:', value);
  };

  const handleMultiChange = (values) => {
    setMultiValue(values);
    console.log('Multi Select Values:', values);
  };

  return (
    <div className="container">
      <h2>Custom Select Component</h2>

      <h3>Single Select</h3>
      <Select
        label="Single Select"
        value={singleValue}
        onChange={handleSingleChange}
        options={options}
        placeholder="Select an option"
      />

      <h3>Multi Select with Search</h3>
      <Select
        label="Multi Select"
        value={multiValue}
        onChange={handleMultiChange}
        options={options}
        multiple
        searchable
        placeholder="Select multiple options"
      />
    </div>
  );
}

export default Home;
