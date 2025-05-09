import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoopPage from './Pages/CoopPage/CoopPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Coop from './Pages/Coop/Coop';
import { Context } from './Context/Context';
import { useContext } from 'react';
import SingleProduct from './Pages/SingleProduct/SingleProduct';
import Pay from './Pages/Pay/Pay';
import PaySuccess from './Pages/Pay/PaySuccess';
import UsePage from './Pages/UsePage/UsePage';
import AddModele from './Pages/AddModele/AddModele';
import Search from './Pages/Search/Search';
import ChatPage from './Pages/ChatPage/ChatPage';
import AllChats from './Pages/Allchats/AllChats';
import Adm from './Pages/Adm/Adm';


function App() {
  const { user } = useContext(Context)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/" element={user ? <Home /> : <Login />} exact />
          <Route path="/cooperativa" element={user ? <Coop /> : <Login />} exact />
          <Route path="/cooperativa/:id" element={user ? <CoopPage /> : <Login />} exact />
          <Route path="/produto/:id" element={user ? <SingleProduct /> : <Login />} exact />
          <Route path="/user/:id" element={user ? <UsePage /> : <Login />} exact />
          <Route path="/pay" element={user ? <Pay /> : <Login />} exact />
          <Route path="/search/:key" element={user ? <Search /> : <Login />} exact />
          <Route path="/chat/:id" element={user ? <ChatPage /> : <Login />} exact />
          <Route path="/chat" element={user ? <AllChats /> : <Login />} exact />
          <Route path="/admin" element={user ? <Adm /> : <Login />} exact />
          <Route path="/success" element={user ? <PaySuccess /> : <Login />} exact />
          <Route path="/addmodele" element={user ? <AddModele /> : <Login />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
