import React from 'react';
import ScrollToBottom  from 'react-scroll-to-bottom';

const Messages = ({ messages, user }: {messages: Array<any>, user:String}) => {
    return (
        <ScrollToBottom>
            {
                messages.map((message, index) => {
                    switch (message.user) {
                        case "admin":
                            return (<div key={message.text + index} className="systemText">
                                <p>{ message.text }</p>
                            </div>); 
                        default: 
                            return (
                                <div id='cm-msg' key={message.text + index} className={`chat-msg ${message.user.toLowerCase() == user.toLowerCase() && "self"}`}> 
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
        </ScrollToBottom>
    )
}

export default Messages;