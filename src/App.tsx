import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./views/Home";
import Result from "./views/Result";
import Layout from "./views/Layout";
import { ChatProvider } from "./contexts/ChatContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Notification from "./components/Notification";
import AdvancedHome from "./views/AdvancedHome";
import AdvancedResult from "./views/AdvancedResult";
import Login from "./views/Login";
import Account from "./views/Account"
import { UserProvider } from "./contexts/UserContext";
export function sum(a: number, b: number) {
  return a + b;
}

const App = () => {
  return (
    <UserProvider>
    <ChatProvider>
    <NotificationProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/advanced' element={<AdvancedHome />} />
            <Route path='/result' element={<Result />} />
            <Route path='/advancedresult' element={<AdvancedResult />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/account' element={<Account />}/>
          </Route>
        </Routes>
      </HashRouter>
      <Notification />
      </NotificationProvider>
    </ChatProvider>
    </UserProvider>
  );
};

export default App;
