import React from 'react';
import Select from './components/select/Select';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

function App() {
  const handleSingleSelectChange = (selectedOption) => {
    console.log('Single Selected:', selectedOption);
  };

  const handleMultiSelectChange = (selectedOptions) => {
    console.log('Multi Selected:', selectedOptions);
  };

  return (
    <div>
      <h2>Single Select</h2>
      <Select options={options} onChange={handleSingleSelectChange} placeholder="Select an option" />

      <h2>Multi Select</h2>
      <Select options={options} isMulti onChange={handleMultiSelectChange} placeholder="Select multiple options" isSearchable />
    </div>
  );
}

export default App;
