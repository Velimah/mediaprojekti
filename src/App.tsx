import './App.css';
import {Routes, Route, HashRouter} from 'react-router-dom';
import Home from './views/Home';
import Result from './views/Result';
import Layout from './views/Layout';
import ScrollToTop from './hooks/ScrollHook';
import { ChatProvider } from './contexts/ChatContext';
import { NotificationProvider } from "./contexts/NotificationContext";
import Notification from "./components/Notification";
export function sum(a: number, b: number) {
  return a + b
}

const App = () => {
  return (
    <ChatProvider>
      <NotificationProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
            </Route>
          </Routes>
        </HashRouter>
        <Notification />
      </NotificationProvider>
    </ChatProvider>
  );
};

export default App;