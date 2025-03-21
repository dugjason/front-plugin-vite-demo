import { useAuth0 } from "@auth0/auth0-react";
import type { ConversationContext } from "@frontapp/plugin-sdk";

import { UnauthenticatedView } from "./UnauthenticatedView";

export function AuthenticatedView({frontContext}: {frontContext: ConversationContext}) {
  const { user, logout } = useAuth0();

  if (!user) {
    return <UnauthenticatedView />;
  }

  if (frontContext.type !== "singleConversation") {
    return <div>Plugin only supports single conversation view</div>;
  }

  const {conversation, teammate} = frontContext

  return (
    <div className="authenticated-view">
      <div className="user-info card">
        <h2>Auth0 User Information</h2>
        {user?.picture && <img src={user.picture} width={180} alt="Profile" />}
        <p>Auth0 name: <span className="bold">{user?.name}</span></p>
        <p>Auth0 email: <span className="bold">{user?.email}</span></p>
      </div>

      <div className="plugin-info card">
        <h2>Frontapp Plugin Information</h2>
        <p>Hi <span className="bold">{teammate.name}</span>,</p>
        <p>You are viewing conversation <span className="bold">{conversation.id}</span></p>
        <button onClick={() => frontContext.assign(teammate.id)}>
          Click to assign to yourself
        </button>
      </div>

      <div className="actions">
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log Out
        </button>
      </div>
    </div>
  )
}


