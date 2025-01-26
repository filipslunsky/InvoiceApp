import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InvoiceList from './features/invoices/InvoiceList';
import Navbar from './features/general/Navbar';
import InvoiceDetail from './features/invoices/InvoiceDetail';
import './App.css';

function App() {
  const nightMode = useSelector(state => state.visual.nightMode);

  return (
    <>
      <div className={nightMode ? "globalContainer nightMode" : "globalContainer"}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/invoice/:id' element={<InvoiceDetail />} />
          <Route path='/invoices' element={<InvoiceList />} />
          <Route path='/' element={<InvoiceList />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App;
