import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import LogForm from "./components/LogForm";
import MemberForm from "./components/MemberForm";

import { AlertStateProvider } from "./providers/AlertStateProvider";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/" element={
          <AlertStateProvider>
            <Layout
              children={<LogForm />}
              modal={<MemberForm />}
            />
          </AlertStateProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;