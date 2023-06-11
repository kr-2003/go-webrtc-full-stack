package server

import (
	"flag"
	"os"
	"time"

	"video-call/backend/internal/handlers"
	w "video-call/backend/pkg/webrtc"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"

	// "github.com/gofiber/template/html"
	"github.com/gofiber/websocket/v2"
)

var (
	addr = flag.String("addr", ":"+os.Getenv("PORT"), "")
	cert = flag.String("cert", "", "")
	key  = flag.String("key", "", "")
)

func Run() error {
	flag.Parse()

	if *addr == ":" {
		*addr = ":9090"
	}

	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/room/:uuid", handlers.Room)
	app.Get("/room/:uuid/websocket", websocket.New(handlers.RoomWebsocket, websocket.Config{
		HandshakeTimeout: 10 * time.Second,
	}))

	w.Rooms = make(map[string]*w.Room)
	w.Streams = make(map[string]*w.Room)
	return app.Listen(*addr)
}
