import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect } from 'react';
import '../Component/Modal.css';
import { editVendor, getVendorById } from '../apiService';
import VendorForm from './VendorForm';

const fields = [
  { id: 'name', label: 'Name', keys: 'name' },
  { id: 'address.street', label: 'Street', keys: 'street' },
  { id: 'address.street2', label: 'Street 2', keys: 'street2' },
  { id: 'address.city', label: 'City', keys: 'city' },
  { id: 'address.state', label: 'State', keys: 'state' },
  { id: 'address.zipCode', label: 'Zip Code', keys: 'zipCode' },
  { id: 'contact.email', label: 'Email', keys: 'email' },
  { id: 'contact.contactName', label: 'Contact Name', keys: 'contactName' },
  { id: 'contact.titleOrRole', label: 'Title or Role', keys: 'titleOrRole' },
  { id: 'contact.phone', label: 'Phone', keys: 'phone' }
];

export default function EditVendor({ vendor, onRefresh }) {
  const [modal, setModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(Math.min(window.innerWidth * 0.8, 600));
  const [currentVendor, setCurrentVendor] = useState({
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

  const [error, setError] = useState(null);

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
      setError(null);
    }
    setModal(!modal);
  };

  const handleChange = (id, value) => {
    const keys = id.split('.');
    setCurrentVendor((prevValues) => {
      const newVendor = { ...prevValues };
      let current = newVendor;
      for (let i = 0; i < keys.length - 1; i += 1) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newVendor;
    });
  };

  const handleSubmit = async () => {
    try {
      const vendorToEdit = {
        id: currentVendor.id,
        name: currentVendor.name,
        address: {
          street: currentVendor.street,
          street2: currentVendor.street2,
          city: currentVendor.city,
          state: currentVendor.state,
          zipCode: currentVendor.zipCode
        },
        contact: {
          contactName: currentVendor.contactName,
          email: currentVendor.email,
          titleOrRole: currentVendor.titleOrRole,
          phone: currentVendor.phone
        }
      };
      await editVendor(vendorToEdit);
      setError(null);
      toggleModal();
      onRefresh();
      setCurrentVendor({
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
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const handleEditVendor = async (id) => {
    try {
      const vendorById = await getVendorById(id);
      const experimentVendor = {
        id: vendorById.id,
        name: vendorById.name,
        street: vendorById.address.street,
        street2: vendorById.address.street2,
        city: vendorById.address.city,
        state: vendorById.address.state,
        zipCode: vendorById.address.zipCode,
        email: vendorById.contact.email,
        contactName: vendorById.contact.contactName,
        titleOrRole: vendorById.contact.titleOrRole,
        phone: vendorById.contact.phone
      };
      setCurrentVendor(experimentVendor);
      console.log(vendorById);
      toggleModal();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <EditIcon style={{ marginRight: '8px' }} onClick={() => handleEditVendor(vendor.id)} />
        {vendor.id}
      </div>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content' style={{ maxWidth: modalWidth }}>
            <div className='modal-header'>
              <h2>EDIT VENDOR FORM</h2>
            </div>
            <VendorForm fields={fields} vendor={currentVendor} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={toggleModal}>
                Cancel
              </button>
              <button type='button' className='submit-close-modal' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
