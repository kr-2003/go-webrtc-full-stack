FROM golang:1.20

WORKDIR /app

COPY go.mod .

COPY . .

RUN go mod tidy

RUN cd cmd && go build -o bin .

ENTRYPOINT [ "/app/cmd/bin" ]