import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export function Auth0Callback() {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setStatus('success');
        // Send message to opener window if this was opened as a popup
        if (window.opener) {
          window.opener.postMessage({ type: 'AUTH_SUCCESS' }, window.location.origin);
          // Close this popup window after a short delay
          setTimeout(() => window.close(), 1500);
        }
      } else {
        setStatus('error');
      }
    }
  }, [isLoading, isAuthenticated]);

  return (
    <div className="auth0-callback">
      <h2>Authentication {status === 'loading' ? 'in progress' : status === 'success' ? 'successful!' : 'failed'}</h2>
      
      {status === 'loading' && <p>Verifying your credentials...</p>}
      
      {status === 'success' && (
        <p>You've been successfully logged in. This window will close automatically.</p>
      )}
      
      {status === 'error' && (
        <div>
          <p>There was a problem authenticating your account.</p>
          {error && <p className="error-message">{error.message}</p>}
          <button onClick={() => window.close()}>Close Window</button>
        </div>
      )}
    </div>
  );
}
