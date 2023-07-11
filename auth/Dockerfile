FROM golang:1.19

WORKDIR /app

COPY go.mod .

COPY . .

RUN go get

RUN go build -o bin .

EXPOSE 8080

ENTRYPOINT [ "/app/bin" ]