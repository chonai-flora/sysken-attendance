import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Log from "./components/Log";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<Layout children={<Log />} />} />
      </Routes>
    </Router>
  );
}

export default App;