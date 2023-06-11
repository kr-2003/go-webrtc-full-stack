import React, { useContext, useEffect } from 'react'
import { MyContext } from '../MyContext'
import { useParams } from "react-router-dom"
import axios from "axios"
import connect from '../functions/peer'
import Chat from './Chat'

function Room() {
    const {
        RoomWebsocketAddr,
        setRoomWebsocketAddr,
        setChatWebsocketAddr,
        setViewerWebsocketAddr,
    } = useContext(MyContext)



    const { id } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:9090/room/${id}`)
            .then((response) => {
                console.log(response.data)
                setRoomWebsocketAddr(response.data.RoomWebsocketAddr)
                setChatWebsocketAddr(response.data.ChatWebsocketAddr)
                setViewerWebsocketAddr(response.data.ViewerWebsocketAddr)
            })

        navigator.mediaDevices.getUserMedia({
            video: {
                width: {
                    max: 1280
                },
                height: {
                    max: 720
                },
                aspectRatio: 4 / 3,
                frameRate: 30,
            },
            audio: {
                sampleSize: 16,
                channelCount: 2,
                echoCancellation: true
            }
        })
            .then(stream => {
                document.getElementById('localVideo').srcObject = stream
                if(RoomWebsocketAddr!==undefined){
                    connect(stream, RoomWebsocketAddr)
                }
            }).catch(err => console.log(err))
    })



    return (
        <div>
            <div className="viewer">
                <p className="icon-users" id="viewer-count"></p>
            </div>

            <div id="noperm" className="columns">
                <div className="column notif">
                    <article className="notification is-link">
                        Camera and microphone permissions are needed to join the room. <br />
                        Otherwise, you can join the <a href='x'><strong>stream</strong></a> as viewer.
                    </article>
                </div>
            </div>

            <div id="peers">
                <div className="columns is-multiline" id="videos">
                    <div className="column is-6 peer">
                        <video id="localVideo" className="video-area mirror" autoPlay muted></video>
                    </div>
                    <div id="noone" className="column is-6 notif">
                        <article id="noonein" className="notification is-primary is-light">
                            <button className="delete"></button>
                            No other streamer is in the room. <br />
                            Share your room link to invite your friends.
                        </article>
                        <article className="notification is-primary is-light">
                            <button className="delete"></button>
                            Share your stream link with your viewers.
                        </article>
                    </div>
                    <div id="nocon" className="column is-6 notif">
                        <article className="notification is-danger">
                            Connection is closed!<br />
                            Please refresh the page.
                        </article>
                    </div>
                </div>
            </div>
            <Chat></Chat>
        </div>
    )
}

export default Room