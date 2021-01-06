import React from 'react'

const Messages = ({ messages }: {messages: Array<any>}) => {
    return (
        <>
            {messages.map(message => (
            <div id='cm-msg' className="chat-msg">
                <span className="msg-avatar">
                    <img src="https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745" />
                </span>
                <div className="cm-msg-text">
                    {message.text}
                </div>
            </div>
        ))}
        </>
    )
}

export default Messages;