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
                console.log(doScroll)
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
                        item.classList.add("flex-1", "bg-indigo-400", "text-white", "p-2", "rounded-lg", "mb-2", "relative")
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
        <>
            <div className='h-[600px] rounded-md overflow-y-scroll'>
                <div id="chat" className="flex flex-col h-[100%] bg-white relative overflow-y-scroll rounded-lg">
                    <article class="message chat overflow-y-scroll">
                        <div class="message-header p-4" onclick="slideToggle()">
                            <p>Messages</p>
                            <i id="chat-alert"></i>
                        </div>
                        <div className='w-100 h-100 flex flex-col bg-white overflow-y-scroll' id="chat-content">
                            <div class="body overflow-y-hidden p-4">
                                <div id="log" className='overflow-y-scroll h-100'></div>
                            </div>
                        </div>
                    </article>
                    <form className='mt-auto' id="form" autocomplete="off">
                        <div class="field has-addons">
                            <div class="send grid grid-cols-5 w-[100%]">
                                <div class="control-input col-span-4">
                                    <input class="h-14 p-4 input w-full rounded-full border border-gray-200" id="msg" type="text" placeholder="type message..." />
                                </div>
                                <div class="control col-span-1 w-100 h-100 flex items-center justify-center">
                                    <button id="chat-button" class="button is-info h-[100%] w-[100%]">Send</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>


        </>
    )
}

export default Chat