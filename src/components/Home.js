import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import './Home.css';
import { Invoice, modalInvoice } from './Homes'; 

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const invoice = Invoice.map((item) => item.invoiceNumber);
    const dates = Invoice.map((item) => item.date);
    const [date, setDate] = useState('');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemTax, setItemTax] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [taxRate, setTaxRate] = useState(0.5); 
    const [modalTotal, setModalTotal] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
    useEffect(() => {
     
      const calculatedModalTotal = modalInvoice.reduce((acc, item) => acc + item.price, 0);
      setModalTotal(calculatedModalTotal);
    }, [modalInvoice]);
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const openItemModal = () => {
      setShowItemModal(true);
    };
  
    const closeItemModal = () => {
      setShowItemModal(false);
    };
  
    const handleInvoiceNumberChange = (e) => {
      setInvoiceNumber(e.target.value);
    };
  
    const handleDateChange = (e) => {
      setDate(e.target.value);
    };
  
    const addItem = () => {
        if (itemName && itemPrice && itemTax) {
            const lastInvoice = Invoice[Invoice.length - 1];
            const lastInvoiceNumber = parseInt(lastInvoice.invoiceNumber);
            const newInvoiceNumber = lastInvoiceNumber + 1;
    
            const newItem = {
                id: newInvoiceNumber.toString(), 
                name: itemName,
                price: parseFloat(itemPrice),
                tax: parseFloat(itemTax),
            };
            setItems([...items, newItem]); 
            setItemName(''); 
            setItemPrice('');
            setItemTax('');
            closeItemModal();
        }
    };
    
    
      
  
    const calculateTax = () => {
      if (items.length === 0) return 0; 
      return items.reduce((acc, item) => acc + item.price * item.tax / 100, 0);
    };
  
    const calculateGrandTotal = () => {
      if (items.length === 0) return 0; 
      return items.reduce((acc, item) => acc + item.price * (1 + item.tax / 100), 0);
    };
  
    const saveInvoice = () => {
     
      const newInvoice = {
        invoiceNumber,
        date,
        customerName,
        total: calculateGrandTotal(), 
        taxRate: (taxRate * 100).toFixed(2),
        grandTotal: calculateGrandTotal() + calculateTax(),
      };
      
      modalInvoice.push(newInvoice);
     
      setInvoiceNumber('');
      setDate('');
      setCustomerName('');
      setItems([]);
      setModalTotal(0);
      closeModal();
    };
  
    return (
      <div className="home-container">
        <div className="button-container">
          <Button variant="contained" className="create-button" onClick={openModal}>
            Create
          </Button>
          <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="search-button">Search</button>
        </div>
        </div>
        <Modal open={showModal} onClose={closeModal} className="invoice-modal">
          <div className="modal-content">
            <h2>Create Invoice</h2>
            <Button variant="outlined" onClick={closeModal}>
              Close
            </Button>
            <br />
            <br />
            <form>
              <TextField label="Invoice Number" value={invoice} onChange={handleInvoiceNumberChange} />
              <TextField type="date" label="Date" value={dates} onChange={handleDateChange} />
              <Button variant="contained" onClick={openItemModal}>
                Add Item
              </Button>
            </form>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item ID</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Tax (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.tax}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div style={{ textAlign: 'right' }}>Total: {calculateGrandTotal()}</div> 
            <div style={{ textAlign: 'right' }}>Tax: {calculateTax()}</div>
            <div style={{ textAlign: 'right' }}>Grand Total: {calculateGrandTotal() + calculateTax()}</div> 
            <br />
            <Button variant="contained" onClick={saveInvoice}>
              Save Invoice
            </Button>
          </div>
        </Modal>
        <Modal open={showItemModal} onClose={closeItemModal} className="item-modal">
          <div className="modal-content">
            <h2>Add Item</h2>
            <Button variant="outlined" onClick={closeItemModal}>
              Close
            </Button>
            <br />
            <br />
            <form>
              <TextField label="Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
              <TextField label="Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
              <TextField label="Tax" value={itemTax} onChange={(e) => setItemTax(e.target.value)} />
              <Button variant="contained" onClick={addItem}>
                Add
              </Button>
            </form>
          </div>
        </Modal>
        <div className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Tax (%)</TableCell>
                <TableCell>Grand Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Invoice.map((invoice, index) => {

  
  const correspondingItem = modalInvoice.find((item) => item.tax);
  const taxAmount = invoice.total * (correspondingItem ? correspondingItem.tax / 100 : 0);

  return (
    <TableRow key={index}>
      <TableCell>{invoice.invoiceNumber}</TableCell>
      <TableCell>{invoice.date}</TableCell>
      <TableCell>{invoice.customerName}</TableCell>
      <TableCell>{invoice.total}</TableCell>
      <TableCell>{correspondingItem ? taxAmount : '-'}</TableCell>
      <TableCell>{invoice.total + taxAmount}</TableCell>
    </TableRow>
  );
})}


</TableBody>

          </Table>
        </div>
      </div>
    );
  };
  
  export default Home;
