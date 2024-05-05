
import './App.css';
import { ToastContainer } from "react-toastify";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from "./components/Navbar";
import Home from './components/Home';
function App() {
  return (
    <div className="App">

        <Navbar/>
       <Home/>
      <ToastContainer />
     
    </div>
  );
}

export default App;

