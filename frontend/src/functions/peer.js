const connect = (stream, RoomWebsocketAddr) => {
  let pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:turn.l.google.com:19302",
      },
      {
        urls: "turn:turn.l.google.com:19302",
        username: "abhinav",
        credential: "abhinav",
      },
    ],
  });
  console.log(pc);
// let ws = new WebSocket(RoomWebsocketAddr);

  pc.ontrack = (event) => {
    if (event.track.kind === "audio") {
      return;
    }
    console.log(event)
    let col = document.createElement("div");
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

          pc.addIceCandidate(candidate);

          break;
        default:
          console.log("dont know");
      }
    };

    ws.onerror = function (evt) {
      console.log("error: " + evt.data);
    };
  };
};

export default connect;
