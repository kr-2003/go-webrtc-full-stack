package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/kr-2003/jwt-golang/controllers"
)

func AuthRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/users/signup", controller.Signup())
	incomingRoutes.POST("/users/login", controller.Login())
}
