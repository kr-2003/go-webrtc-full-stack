import React, { useContext, useEffect } from 'react'
import { MyContext } from '../MyContext'
import { useParams } from "react-router-dom"
import axios from "axios"
import connect from '../functions/peer'

function Room() {
    const {
        roomid,
        RoomWebsocketAddr,
        setRoomWebsocketAddr,
        ChatWebsocketAddr,
        setChatWebsocketAddr,
        ViewerWebsocketAddr,
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
                let pc = new RTCPeerConnection({
                    iceServers: [
                        {
                            urls: "stun:turn.videochat:3478",
                        },
                        {
                            urls: "turn:turn.videochat:3478",
                            username: "akhil",
                            credential: "akhil",
                        },
                    ],
                });
                console.log(pc)
                pc.ontrack = function (event) {
                    console.log("MESASSDDSDcscscwdcwedwedewdwedwedwedwedwedwedwedewSA");
                    if (event.track.kind === "audio") {
                        return;
                    }

                    let col = document.createElement("div");
                    console.log(col)
                    col.className = "column is-6 peer";
                    let el = document.createElement(event.track.kind);
                    el.srcObject = event.streams[0];
                    el.setAttribute("controls", "true");
                    el.setAttribute("autoplay", "true");
                    el.setAttribute("playsinline", "true");
                    col.appendChild(el);
                    document.getElementById("noone").style.display = "none";
                    document.getElementById("nocon").style.display = "none";
                    document.getElementById("videos").appendChild(col);

                    event.track.onmute = function (event) {
                        el.play();
                    };

                    event.streams[0].onremovetrack = ({ track }) => {
                        if (el.parentNode) {
                            el.parentNode.remove();
                        }
                        if (document.getElementById("videos").childElementCount <= 3) {
                            document.getElementById("noone").style.display = "grid";
                            document.getElementById("noonein").style.display = "grid";
                        }
                    };
                };

                stream.getTracks().forEach((track) => pc.addTrack(track, stream));

                let ws = new WebSocket(RoomWebsocketAddr);
                pc.onicecandidate = (e) => {
                    if (!e.candidate) {
                        return;
                    }

                    ws.send(
                        JSON.stringify({
                            event: "candidate",
                            data: JSON.stringify(e.candidate),
                        })
                    );
                };

                ws.addEventListener("error", function (event) {
                    console.log("error: ", event);
                });

                ws.onclose = function (evt) {
                    console.log("websocket has closed");
                    pc.close();
                    pc = null;
                    let pr = document.getElementById("videos");
                    while (pr.childElementCount > 3) {
                        pr.lastChild.remove();
                    }
                    document.getElementById("noone").style.display = "none";
                    document.getElementById("nocon").style.display = "flex";
                    setTimeout(function () {
                        connect(stream);
                    }, 1000);
                };

                ws.onmessage = function (evt) {
                    let msg = JSON.parse(evt.data);
                    if (!msg) {
                        return console.log("failed to parse msg");
                    }

                    switch (msg.event) {
                        case "offer":
                            let offer = JSON.parse(msg.data);
                            if (!offer) {
                                return console.log("failed to parse answer");
                            }
                            pc.setRemoteDescription(offer);
                            pc.createAnswer().then((answer) => {
                                pc.setLocalDescription(answer);
                                ws.send(
                                    JSON.stringify({
                                        event: "answer",
                                        data: JSON.stringify(answer),
                                    })
                                );
                            });
                            return;

                        case "candidate":
                            let candidate = JSON.parse(msg.data);
                            if (!candidate) {
                                return console.log("failed to parse candidate");
                            }
                            break
                        default:
                            console.log("D")

                            pc.addIceCandidate(candidate);
                    }
                };

                ws.onerror = function (evt) {
                    console.log("error: " + evt.data);
                };
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
        </div>
    )
}

export default Room