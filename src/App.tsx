import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { auth0Config } from "./auth/auth0-config";
import { AuthenticatedView } from "./components/AuthenticatedView";
import { UnauthenticatedView } from "./components/UnauthenticatedView";
import { Auth0Callback } from "./components/Auth0Callback";
import { FrontContextProvider, useFrontContext } from "./providers/front";
import './App.css';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth0();
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

  return isAuthenticated ? <AuthenticatedView frontContext={frontContext} /> : <UnauthenticatedView />;
}

function App() {
  return (
    <FrontContextProvider>
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        authorizationParams={{
          redirect_uri: auth0Config.callbackUrl,
          scope: "openid profile email",
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/auth0-callback" element={<Auth0Callback />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </FrontContextProvider>
  );
}

export default App;
