import React, { useEffect, useContext } from 'react'
import { MyContext } from '../MyContext';

function Chat() {
    const {
        ChatWebsocketAddr,
    } = useContext(MyContext)


    useEffect(() => {
        if (ChatWebsocketAddr !== undefined) {
            let chatWs
            var msg = document.getElementById("msg");
            var log = document.getElementById("log");

            var slideOpen = false;

            function slideToggle() {
                var chat = document.getElementById('chat-content');
                if (slideOpen) {
                    chat.style.display = 'none';
                    slideOpen = false;
                } else {
                    chat.style.display = 'block'
                    document.getElementById('chat-alert').style.display = 'none';
                    document.getElementById('msg').focus();
                    slideOpen = true
                }
            }

            function appendLog(item) {
                var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
                log.appendChild(item);
                if (doScroll) {
                    log.scrollTop = log.scrollHeight - log.clientHeight;
                }
            }

            function currentTime() {
                var date = new Date;
                let hour = date.getHours();
                let minute = date.getMinutes();
                if (hour < 10) {
                    hour = "0" + hour
                }
                if (minute < 10) {
                    minute = "0" + minute
                }
                return hour + ":" + minute
            }

            document.getElementById("form").onclick = function (e) {
                e.preventDefault()
                if (!chatWs) {
                    return false;
                }
                if (!msg.value) {
                    return false;
                }
                chatWs.send(msg.value);
                msg.value = "";
                return false;
            };

            function connectChat() {
                chatWs = new WebSocket(ChatWebsocketAddr)
                console.log(chatWs)

                chatWs.onclose = function (evt) {
                    console.log("websocket has closed")
                    document.getElementById('chat-button').disabled = true
                    setTimeout(function () {
                        connectChat();
                    }, 1000);
                }

                chatWs.onmessage = function (evt) {
                    var messages = evt.data.split('\n');
                    if (slideOpen == false) {
                        document.getElementById('chat-alert').style.display = 'block'
                    }
                    for (var i = 0; i < messages.length; i++) {
                        var item = document.createElement("div");

                        item.innerText = currentTime() + " - " + messages[i];
                        appendLog(item);
                    }
                }

                chatWs.onerror = function (evt) {
                    console.log("error: " + evt.data)
                }

                setTimeout(function () {
                    if (chatWs.readyState === WebSocket.OPEN) {
                        document.getElementById('chat-button').disabled = false
                    }
                }, 1000);
            }

            connectChat();
        }

    }, [ChatWebsocketAddr])
    return (
        <div>
            <div id="chat">
                <article class="message chat">
                    <div class="message-header" onclick="slideToggle()">
                        <p>Chat</p>
                        <i id="chat-alert"></i>
                    </div>
                    <div id="chat-content">
                        <div class="body">
                            <div id="log"></div>
                        </div>
                        <form id="form" autocomplete="off">
                            <div class="field has-addons">
                                <div class="send">
                                    <div class="control-input">
                                        <input class="input" id="msg" type="text" placeholder="type message..." />
                                    </div>
                                    <div class="control">
                                        <button id="chat-button" class="button is-info">Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Chat