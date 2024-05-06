import React from 'react';
import { Modal, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import './Home.css';
import { modalInvoice, Invoice } from './Homes';

const Home = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [showItemModal, setShowItemModal] = React.useState(false);
    const [invoiceNumber, setInvoiceNumber] = React.useState('');
    const invoice = Invoice.map((item) => item.invoiceNumber);
    const dates = Invoice.map((item) => item.date);
    const [date, setDate] = React.useState('');
    const [itemsList, setItemsList] = React.useState([]);
    const [itemName, setItemName] = React.useState('');
    const [total, setTotal] = React.useState(0);

    const [itemPrice, setItemPrice] = React.useState('');
    const [itemTax, setItemTax] = React.useState('');
    const [customerName, setCustomerName] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

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
            const newItem = {
                id: itemsList.length + 1,
                name: itemName,
                price: parseFloat(itemPrice),
                tax: parseFloat(itemTax),
            };
            const updatedItems = [...itemsList, newItem];
            const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price, 0);
            const updatedTax = calculateTax(updatedItems);

            setItemsList(updatedItems);
            setTotal(updatedTotal);
            setItemName('');
            setItemPrice('');
            setItemTax('');
        }
    };

    const calculateTax = (items) => {
        return items.reduce((acc, item) => acc + item.price * item.tax / 100, 0);
    };

    const calculateGrandTotal = (items) => {
      if (items.length === 0) {
          return 0;
      } else {
          const total = modalInvoice.length > 0 ? modalInvoice[0].total : 0;
          return total + calculateTax(items);
      }
  };
  
  const saveInvoice = () => {
    if (date && customerName && itemsList.length > 0) {
        const lastInvoice = modalInvoice.length > 0 ? modalInvoice[modalInvoice.length - 1] : null;
        const lastInvoiceNumber = lastInvoice ? parseInt(lastInvoice.invoiceNumber) : 1000;
        const newInvoiceNumber = (lastInvoiceNumber + 1).toString();

        const newInvoice = {
            id: modalInvoice.length + 1,
            invoiceNumber: newInvoiceNumber,
            date,
            customerName,
            total,
            tax: calculateTax(itemsList),
            items: itemsList,
        };

        modalInvoice.push(newInvoice);

        
        setItemsList([]);
        setTotal(0);
        setItemName('');
        setItemPrice('');
        setItemTax('');
        setDate('');
        setCustomerName('');

        closeModal();
    } else {
        console.log("Please fill all the required fields and add at least one item.");
    }
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
                            {itemsList.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.tax}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div style={{ textAlign: 'right' }}>Total: {total}</div>
                    <div style={{ textAlign: 'right' }}>Tax: {calculateTax(itemsList)}</div>
                    <div style={{ textAlign: 'right' }}>Grand Total: {calculateGrandTotal(itemsList)}</div>
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
                        {modalInvoice.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.invoiceNumber}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.customerName}</TableCell>
                                <TableCell>{invoice.total}</TableCell>
                                <TableCell>{invoice.items.reduce((acc, item) => acc + item.price * item.tax / 100, 0)}</TableCell>
                                <TableCell>{invoice.total + invoice.items.reduce((acc, item) => acc + item.price * item.tax / 100, 0)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Home;

