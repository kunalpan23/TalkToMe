import React, { useState } from 'react'
import {Link} from 'react-router-dom';

import './Join.scss';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    
    return(
    <div className="join__wrap">
        <div className="joinRoom">
            <h1>Join In</h1>
            <form onSubmit={(e) =>  e.preventDefault()}>
                <input type="text" placeholder="Name" value={name} required={true} onChange={e=> setName(e.target.value)} />
                <input type="text" placeholder="Room" value={room} required={true} onChange={e=> setRoom(e.target.value)} />
                <Link to={`/chat?name=${name}&room=${room}`}>
                    <button type="submit" className="btn btn-primary btn-block btn-large">Join Room</button>
                </Link>
            </form>
        </div>
    </div>
)}

export default Join;