import './App.css';
import {Routes, Route, HashRouter} from 'react-router-dom';
import Home from './views/Home';
import Layout from './views/Layout';
import ScrollToTop from './hooks/ScrollHook';

export function sum(a: number, b: number) {
  return a + b
}

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;