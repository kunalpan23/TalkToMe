import React from 'react'

const Messages = ({ messages, user }: {messages: Array<any>, user:String}) => {
    return (
        <>
            {
                messages.map(message => {
                    switch (message.user) {
                        case "admin":
                            return (<div key={message.text} className="systemText">
                                <p>{ message.text }</p>
                            </div>); 
                        default: 
                            return (
                                <div id='cm-msg' key={message.text} className={`chat-msg ${message.user.toLowerCase() == user.toLowerCase() && "self"}`}> 
                                    <div className="cm-msg-text">
                                        {
                                            message.user.toLowerCase() !== user.toLowerCase() && (<span className="msg-avatar"> 
                                            {message.user[0].toUpperCase() + message.user.substr(1).toLowerCase()}
                                        </span>)
                                            
                                        }
                                        <span className="msg-text">
                                            {message.text}
                                        </span>
                                    </div>
                                </div>
                            )
                    }
                })
            }
        </>
    )
}

export default Messages;