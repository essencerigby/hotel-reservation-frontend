/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
import React from 'react';

const stateAbbreviations = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

function InputField({ id, label, value, onChange, onClear, error, required }) {
  const inputClassName = error ? 'input-flex-error' : 'input-flex';

  const renderRequired = () => {
    if (required) {
      return <span style={{ color: 'red' }}> *</span>;
    }
    return null;
  };

  if (id === 'state') {
    return (
      <div className={`input-field ${id}`} style={{ gridColumn: 1 }}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        <select className={inputClassName} id={id} value={value} onChange={onChange}>
          <option value=''>Select State</option>
          {stateAbbreviations.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }

  if (id === 'zipCode') {
    return (
      <div className={`input-field ${id}`} style={{ gridColumn: 2 }}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        <input className={inputClassName} id={id} type='text' value={value} onChange={onChange} />
        {value && (
          <button
            type='button'
            className={error ? 'clear-button-error' : 'clear-button'}
            onClick={() => onClear(id)}
            style={error ? { transform: 'translateY(-230%)' } : { transform: 'translateY(-40%)' }}
          >
            X
          </button>
        )}
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  if (id === 'contactName') {
    return (
      <div className={`input-field ${id}`}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        <input className={inputClassName} id={id} type='text' value={value} onChange={onChange} />
        {value && (
          <button
            type='button'
            className={error ? 'clear-button-error' : 'clear-button'}
            onClick={() => onClear(id)}
            style={error ? { transform: 'translateY(-220%)' } : { transform: 'translateY(-40%)' }}
          >
            X
          </button>
        )}
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  if (id === 'phone') {
    return (
      <div className={`input-field ${id}`}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        <input className={inputClassName} id={id} type='text' value={value} onChange={onChange} />
        {value && (
          <button
            type='button'
            className={error ? 'clear-button-error' : 'clear-button'}
            onClick={() => onClear(id)}
            style={error ? { transform: 'translateY(-220%)' } : { transform: 'translateY(-40%)' }}
          >
            X
          </button>
        )}
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }

  return (
    <div className={`input-field ${id}`}>
      <label htmlFor={id}>
        {label}:{renderRequired()}
      </label>
      <input
        className={inputClassName}
        id={id}
        type='text'
        value={value}
        onChange={onChange}
        style={{ position: 'relative' }}
      />
      {value && (
        <button type='button' className={error ? 'clear-button-error' : 'clear-button'} onClick={() => onClear(id)}>
          X
        </button>
      )}
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}

export default function VendorForm({ fields, vendor, onChange, errors }) {
  const handleClear = (fieldKeys) => {
    const event = {
      target: {
        id: fieldKeys,
        value: ''
      }
    };
    onChange(event);
  };

  return (
    <form style={{ paddingBottom: '5%' }} className='input-container'>
      {fields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={field.keys.split('.').reduce((o, i) => o[i], vendor)}
          onChange={onChange}
          onClear={handleClear}
          error={errors && errors[field.id]}
          required={field.required}
        />
      ))}
    </form>
  );
}
