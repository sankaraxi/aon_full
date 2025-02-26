// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import SystemCheck from './components/SystemCheck/SystemCheck';
import User from './components/User/User';
import Menuuser from './components/UserMenu/UserMenu';
import ScriptOutputPage from './components/User/startassessment';
import Reportfile from './components/Report/Report';
import Corepage from './components/question creation/question';

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import { Menu } from './Components/menu/menu';
// import { Corepage } from './Components/question creation/question';
// import { Serbv } from './Components/check';
// import { Addcategory } from './Components/question creation/add_category';
// import { User } from './Components/user/user';
// import { Language } from './Components/userquestion/language';
// import { SystemCheck } from './Components/System Check/systemcheck';
// import { Menuuser } from './Components/usermenu/usermenu';
// import ScriptOutputPage from './Components/user/startassessment';
// import { Reportfile } from './Components/report/report';
// import { Transferfile } from './Components/tansferfile/transferfile';
// import StartDockerButton, { Download } from './Components/check/check2floder/check2';


function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        {/* <Route path='/' element={<Download/>}/> */}
        <Route path='/systemcheck/:id' element={[<Menu/>,<SystemCheck/>]}/>
        <Route path='/question_creator/:id' element={[<Menu/>,<Corepage/>]}/>
        <Route path='/user/:id' element={[<Menu/>,<User/>]}/>
        <Route path='/workspace/:id' element={[<Menuuser/>,<ScriptOutputPage/>]}/>
        <Route path='/report/:id' element={[<Menuuser/>,<Reportfile/>]}/>
        {/* <Route path='/question/:id' element={[<User/>]}/> */}
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
