import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { auth0Config } from "../auth/auth0-config";

export function UnauthenticatedView() {
  const { loginWithPopup } = useAuth0();

  // Listen for authentication success message from popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === 'AUTH_SUCCESS'
      ) {
        // Refresh the page or update state to reflect authentication
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogin = async () => {
    try {
      // Simplified configuration for the popup
      await loginWithPopup({
        authorizationParams: {
          redirect_uri: auth0Config.callbackUrl,
        }
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="unauthenticated-view">
      <h1>Frontapp Plugin</h1>
      <p>Please log in to access the plugin features</p>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
