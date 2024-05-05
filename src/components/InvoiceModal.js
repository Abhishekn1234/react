import React, { useState } from 'react';
import './InvoiceModal.css';

const InvoiceModal = ({ onClose }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(true); // Define modalOpen state

  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const addItem = () => {
    // Add item logic
  };

  const removeItem = (index) => {
    // Remove item logic
  };

  const calculateTotal = () => {
    // Calculate total logic
  };

  const closeModal = () => {
    setModalOpen(false); // Set modalOpen state to false to close the modal
    onClose(); // Call onClose prop to inform parent component to close the modal
  };

  return (
    modalOpen && ( // Check if modalOpen state is true
      <div className="modal-container">
        <div className="modal">
          <div className="modal-header">
            <h2>Create Invoice</h2>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
          <div className="modal-body">
            <form>
              <label>Invoice Number:</label>
              <input type="text" value={invoiceNumber} onChange={handleInvoiceNumberChange} />
              <label>Date:</label>
              <input type="date" value={date} onChange={handleDateChange} />
            </form>
            <table>
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Tax (%)</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic rows for items */}
              </tbody>
            </table>
            <button className="add-item-btn" onClick={addItem}>Add Item</button>
            <div>Total: {total}</div>
            <div>Grand Total: {/* Calculate grand total */}</div>
          </div>
        </div>
      </div>
    )
  );
};

export default InvoiceModal;
