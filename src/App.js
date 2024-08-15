import './App.css';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
// import Login from './components/Login';
import { BrowserRouter , Routes, Route} from "react-router-dom";
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import Navbar from './components/Navbar';


function App() {
  return (
    <>

    <BrowserRouter>
      <Navbar/>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/Create" element={<CreateUser />} />
    <Route exact path="/Update/:id" element={<UpdateUser />} />
    <Route exact path="/Delete" element={<DeleteUser />} />
    </Routes>
    </BrowserRouter>
      {/* <Login/>  */}
    </>
  );
}

export default App;
