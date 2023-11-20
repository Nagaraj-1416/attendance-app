import React from 'react';
import { useEffect } from 'react';
import Select from 'react-select';

export default function CustomSelect({ options, isDisabled, isSearchable ,multiSelect,name,onChange,placeholder,className}) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

//  const updatedOptions = options.map((option) => ({
//    ...option,
//    isDisabled: false, // Set isDisabled to false by default
//  }));

  useEffect(()=>{
    console.log(options);
  },[])

  return (
    <Select
      className={className ? className : "basic-multi-select"}
      //classNamePrefix="select"
      placeholder={placeholder?placeholder:''}
      isSearchable={true}
      isMulti = {multiSelect}
      name={name}
      options={options}
      onChange={(selectedOption) => onChange(selectedOption,name,multiSelect)}
      styles={customStyles}
    />
  );
}
