FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o app ./cmd/app

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/app .
CMD ["./app"]