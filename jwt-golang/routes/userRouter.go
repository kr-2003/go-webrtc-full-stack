package routes

import (
	controller "github.com/kr-2003/jwt-golang/controllers"
	"github.com/gin-gonic/gin"
	"github.com/kr-2003/jwt-golang/middleware"
)

func UserRoutes(incomingRoutes *gin.Engine){
	incomingRoutes.Use(middleware.Authenticate())
	incomingRoutes.GET("/users", controller.GetUsers())
	incomingRoutes.GET("/users/:user_id", controller.GetUser())
}