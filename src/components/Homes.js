export const Invoice = [
    {
      invoiceNumber: "1001",
      date: "2024-05-06",
      customerName: "John Doe",
      total: 100.50
    },
   
  ];

  export const modalInvoice = [
    { 
      id: 1, 
      invoiceNumber: '1001',
      date: '2024-05-06',
      customerName: 'John Doe',
      total: 100.50,
      items: [
        { id: 1, name: 'Close Up', price: 60, tax: 5 },
        { id: 2, name: 'Lux', price: 40, tax: 5 },
        { id: 3, name: 'Santhoor', price: 30, tax: 5 }
      ]
    }
  ];
  
  export const items=[
     
    { id: 1, name: 'Close Up', price: 60, tax: 5 },
    { id: 2, name: 'Lux', price: 40, tax: 5 },
    { id: 3, name: 'Santhoor', price: 30, tax: 5 }
  
  ];