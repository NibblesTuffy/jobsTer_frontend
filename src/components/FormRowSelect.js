import React from 'react'

const FormRowSelect = ({
  name,
  value,
  handleChange,
  labelText,
  options,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect
