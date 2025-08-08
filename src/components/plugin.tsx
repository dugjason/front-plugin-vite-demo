import type { ConversationContext } from "@frontapp/plugin-sdk";


export function Plugin({frontContext}: {frontContext: ConversationContext}) {
  if (frontContext.type !== "singleConversation") {
    return <div>Plugin only supports single conversation view</div>;
  }

  const {conversation, teammate} = frontContext

  return (
    <div className="plugin-view">
      <div className="plugin-info card">
        <h2>Frontapp Plugin Information</h2>
        <p>Hi <span className="bold">{teammate.name}</span>,</p>
        <p>You are viewing conversation <span className="bold">{conversation.id}</span></p>
        <button onClick={() => frontContext.assign(teammate.id)}>
          Click to assign to yourself
        </button>
      </div>
    </div>
  )
}


