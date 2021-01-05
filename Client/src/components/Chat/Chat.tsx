import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';

import "./Chat.scss"; 


const Chat = (props:any) => {
    
    const [NAME, setName] = useState('');
    const [ROOM, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const CONNECTION = 'localhost:5000';

    const query: any =  queryString.parse(props.location.search);
    let SOCKET:any;
    useEffect(() => {
        SOCKET = io(CONNECTION); 
        
        setName(query.name);
        setRoom(query.room);
        
        SOCKET.emit("join", query, (res:any) => {
            // Callback code for DB entry 
        });

        return ():any => { 

            SOCKET.emit("disconnect");
            SOCKET.off();
        }
    }, [CONNECTION, props.location.search]);

    useEffect(() => {

        SOCKET.on("message", (message:any) => {
            const allMessages:any = [...messages, message];
        setMessages(allMessages);
        })

    },[messages])

    return (
        <div className="join__wrap">
            <div className="chat-box">
                <div className="chat-box-header">
                    Talk To Me
                </div>
                <div className="chat-box-body">
                    <div className="chat-box-overlay">   
                    </div>
                    <div className="chat-logs"> 
                        
                    </div> 
                </div>
                <div className="chat-input">      
                    <form onSubmit={e => e.preventDefault()}>
                        <input type="text" id="chat-input" placeholder="Send a message..." value={message} />
                        <button type="submit" className="chat-submit" id="chat-submit"><i className="material-icons">send</i></button>
                    </form>      
                </div>
            </div>
        </div>
    )
}

export default Chat;