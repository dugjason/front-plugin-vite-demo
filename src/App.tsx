import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FrontContextProvider, useFrontContext } from "./providers/front";
import './App.css';
import { Plugin } from "./components/plugin";

function AppContent() {
  const {  isLoading } = { isLoading: false };
  const frontContext = useFrontContext();

  if (!frontContext) {
    return (
      <div>
        <p>This application is a <a href="https://front.com">front.com</a> plugin, and can only be renderd as such.</p>
        <p>See the <a href="https://dev.frontapp.com/reference/installation">Plugin SDK docs</a> to get started</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Plugin frontContext={frontContext} />;
}

function App() {
  return (
    <FrontContextProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            {/* <Route path="/auth0-callback" element={<Auth0Callback />} /> */}
          </Routes>
        </BrowserRouter>

    </FrontContextProvider>
  );
}

export default App;
