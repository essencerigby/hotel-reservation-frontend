/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import '../Component/Modal.css';
import { createVendor } from '../apiService';
import { validateVendor } from './ValidateVendor';
import VendorForm from './VendorForm';

// Array of fields for the form
const fields = [
  { id: 'name', label: 'Name', keys: 'name', required: true },
  { id: 'street', label: 'Street Address', keys: 'street', required: true },
  { id: 'street2', label: 'Apt, Suite, etc. ', keys: 'street2' },
  { id: 'city', label: 'City', keys: 'city', required: true },
  { id: 'state', label: 'State', keys: 'state', required: true },
  { id: 'zipCode', label: 'Zip Code', keys: 'zipCode', required: true },
  { id: 'email', label: 'Email', keys: 'email', required: true },
  { id: 'contactName', label: 'Contact Name', keys: 'contactName', required: true },
  { id: 'titleOrRole', label: 'Title or Role', keys: 'titleOrRole', required: true },
  { id: 'phone', label: 'Phone', keys: 'phone', required: true }
];

export default function AddVendor({ onRefresh }) {
  const [modal, setModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(Math.min(window.innerWidth * 0.8, 600));
  const [errors, setErrors] = useState({});
  const [vendor, setVendor] = useState({
    id: '',
    name: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    contactName: '',
    titleOrRole: '',
    phone: ''
  });

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(Math.min(window.innerWidth * 0.8, 600));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleModal = () => {
    if (modal) {
      setErrors({}); // Reset error when closing the modal
    }
    setModal(!modal); // Toggle modal visibility
  };

  // This function handles changes in input fields of the vendor form.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setVendor((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  // This function handles the submission of the vendor form.
  const handleSubmit = async () => {
    const validationErrors = validateVendor(vendor);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const vendorToCreate = {
        id: vendor.id,
        name: vendor.name,
        address: {
          street: vendor.street,
          street2: vendor.street2,
          city: vendor.city,
          state: vendor.state,
          zipCode: vendor.zipCode
        },
        contact: {
          contactName: vendor.contactName,
          email: vendor.email,
          titleOrRole: vendor.titleOrRole,
          phone: vendor.phone
        }
      };
      await createVendor(vendorToCreate);
      setErrors({}); // Reset error on successful submission
      toggleModal(); // Close the modal after successful submission
      onRefresh(); // Refresh the vendor list after successful submission
      setVendor({
        id: '',
        name: '',
        street: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
        email: '',
        contactName: '',
        titleOrRole: '',
        phone: ''
      }); // Resetting the vendor state to its initial empty values after successful submission
    } catch (err) {
      setErrors({ form: err.response ? err.response.data : err.message }); // Set error if submission fails
    }
  };

  const handleCancel = () => {
    setVendor({});
    setErrors({});
    toggleModal(); // Toggle modal visibility
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <button type='button' onClick={toggleModal} className='btn-modal'>
        <strong>Add New +</strong>
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content' style={{ maxWidth: modalWidth }}>
            <div className='modal-header'>
              <h2>NEW VENDOR FORM</h2>
            </div>
            <VendorForm fields={fields} vendor={vendor} onChange={handleChange} errors={errors} />
            {errors.form && <div className='error-message'>{errors.form}</div>}

            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='submit-close-modal' onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div style={{ color: 'red', marginLeft: '10px', textAlign: 'left' }}>* required fields</div>
          </div>
        </div>
      )}
    </>
  );
}
