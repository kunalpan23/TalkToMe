import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import { Link } from "react-router-dom";

import Messages from '../Messages/Messages';

import "./Chat.scss";   

let SOCKET: any;

const Chat = (props:any) => {
    
    const [NAME, setName] = useState('');
    const [ROOM, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const CONNECTION = 'localhost:5000'; 
    const query: any =  queryString.parse(props.location.search);
    
    useEffect(() => { 
        SOCKET = io(CONNECTION);
        console.log(SOCKET);
        setName(query.name);
        setRoom(query.room);
        
        SOCKET.emit("join", query, (res:any) => {
            // Callback code for DB entry 
        }); 

        return (): any => {
            /* Disconnects the socket manually */
            SOCKET.close();
        }
    }, [CONNECTION, props.location.search]);

    useEffect(() => {  

        SOCKET.on("message", (message: any) => { 
            const allMessages: any = [...messages, message];
            setMessages(allMessages);
        });

    }, [messages]);

    const sendMessage = () => {  
        if (message && message.trim()) {
            SOCKET.emit("sendMessage", message, () => setMessage(''));
        }
    }

    return (
        <div className="join__wrap">
            <div className="chat-box">
                <div className="chat-box-header">
                    {ROOM}
                </div>
                <Link to="/">
                    X
                </Link>
                <div className="chat-box-body">
                    <div className="chat-box-overlay">   
                    </div>
                    <div className="chat-logs"> 
                        <Messages user={NAME} messages={messages} />
                    </div> 
                </div>
                <div className="chat-input">      
                    <form onSubmit={e => { e.preventDefault(); sendMessage();}}>
                        <input autoComplete="off" type="text" id="chat-input" placeholder="Send a message..." value={message} onChange={e=> setMessage(e.target.value) } />
                        <button type="submit" className="chat-submit" id="chat-submit">
                            <svg id="Capa_1" enableBackground="new 0 0 512 512" height="40" viewBox="0 0 512 512" width="40" ><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512" y2="0"><stop offset="0" stopColor="#addcff"/><stop offset=".5028" stopColor="#eaf6ff"/><stop offset="1" stopColor="#eaf6ff"/></linearGradient><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="255.996" x2="255.996" y1="407" y2="105"><stop offset="0" stopColor="#00c0ff"/><stop offset="1" stopColor="#5558ff"/></linearGradient><g><g><circle cx="256" cy="256" fill="url(#SVGID_1_)" r="256"/></g><g><g><path d="m402.767 248.441-230.934-142.113c-3.253-2.004-7.382-1.717-10.305.711-2.932 2.411-3.999 6.419-2.672 9.975l48.791 130.109h119.405c4.909 0 8.882 3.973 8.882 8.882s-3.973 8.882-8.882 8.882h-119.405l-48.791 130.109c-1.327 3.556-.26 7.564 2.672 9.975 2.901 2.392 7.031 2.723 10.305.711l230.934-142.114c2.628-1.613 4.224-4.476 4.224-7.564 0-3.087-1.596-5.95-4.224-7.563zm-288.885 16.446h53.292c4.909 0 8.882-3.973 8.882-8.882s-3.973-8.882-8.882-8.882h-53.292c-4.909 0-8.882 3.973-8.882 8.882s3.973 8.882 8.882 8.882zm35.528 17.764h-35.528c-4.909 0-8.882 3.973-8.882 8.882s3.973 8.882 8.882 8.882h35.528c4.909 0 8.882-3.973 8.882-8.882 0-4.91-3.972-8.882-8.882-8.882zm-35.528-53.293h35.528c4.909 0 8.882-3.973 8.882-8.882s-3.973-8.882-8.882-8.882h-35.528c-4.909 0-8.882 3.973-8.882 8.882s3.973 8.882 8.882 8.882z" fill="url(#SVGID_2_)"/></g></g></g></svg>
                        </button>
                    </form>      
                </div>
            </div>
        </div>
    )
}

export default Chat;