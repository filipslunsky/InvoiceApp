import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvoiceList from './features/invoices/InvoiceList';
import Navbar from './features/general/Navbar';
import NewInvoice from './features/invoices/NewInvoice';
import InvoiceDetail from './features/invoices/InvoiceDetail';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/new' element={<NewInvoice />} />
          <Route path='/invoice/:id' element={<InvoiceDetail />} />
          <Route path='/invoices' element={<InvoiceList />} />
          <Route path='/' element={<InvoiceList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
