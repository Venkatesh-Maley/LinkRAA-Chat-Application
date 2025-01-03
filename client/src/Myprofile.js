import React, { useContext, useState, useEffect } from 'react';
import { store } from './App';
import Nav from './Nav';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Myprofile.css'; // Import the custom CSS file

const Myprofile = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState(null);
    const [allmsg, setAllmsg] = useState([]);
    const [newmsg, setNewmsg] = useState("");

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/myprofile', {
                headers: {
                    'x-token': token
                }
            }).then(res => setData(res.data)).catch((err) => console.log(err))

            axios.get('http://localhost:5000/getmsg', {
                headers: {
                    'x-token': token
                }
            }).then(res => setAllmsg(res.data)).catch((err) => console.log(err))
        }
    }, [token]);

    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/addmsg', { text: newmsg }, {
            headers: {
                'x-token': token
            }
        }).then(res => {
            setAllmsg(res.data);
            setNewmsg("");
        }).catch((err) => console.log(err))
    }

    if (!token) {
        return <Navigate to='/' />;
    }

    return (
        <div className="myprofile-container">
            {data &&
                <div className="chat-container container">
                    <h2 className="chat-title">Alumni Group Chat</h2>
                    <div className="messages-container">
                        {allmsg.length >= 1 ?
                            allmsg.map(message =>
                                <div className="message-card card" key={message.id}>
                                    <div className="card-body">
                                        <h4 className="message-header">
                                            {message.username}
                                            <Moment format="YYYY/MM/DD HH:mm" className="message-date">
                                                {message.date}
                                            </Moment>
                                        </h4>
                                        <p className="message-text">{message.text}</p>
                                    </div>
                                </div>
                            )
                            :
                            <p className="loading-text">Loading...</p>
                        }
                    </div>
                    <form onSubmit={submitHandler} className="message-form d-flex">
                        <input
                            type="text"
                            value={newmsg}
                            onChange={e => setNewmsg(e.target.value)}
                            placeholder="Type your message..."
                            className="form-control message-input"
                        />
                        <button type="submit" className="send-button btn btn-primary ms-2">Send Message</button>
                    </form>
                    <button onClick={() => setToken(null)} className="logout-button btn btn-danger">Logout</button>
                </div>
            }
        </div>
    );
}

export default Myprofile;
