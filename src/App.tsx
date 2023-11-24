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
export function sum(a: number, b: number) {
  return a + b;
}

const App = () => {
  return (
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
          </Route>
        </Routes>
      </HashRouter>
      <Notification />
      </NotificationProvider>
    </ChatProvider>
  );
};

export default App;
