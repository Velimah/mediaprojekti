import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./views/Home";
import Result from "./views/Result";
import Layout from "./views/Layout";
import { ChatProvider } from "./contexts/ChatContext";
import AdvancedHome from "./views/AdvancedHome";
import AdvancedResult from "./views/AdvancedResult";
export function sum(a: number, b: number) {
  return a + b;
}

const App = () => {
  return (
    <ChatProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/advanced' element={<AdvancedHome />} />
            <Route path='/result' element={<Result />} />
            <Route path='/advancedresult' element={<AdvancedResult />} />
          </Route>
        </Routes>
      </HashRouter>
    </ChatProvider>
  );
};

export default App;
