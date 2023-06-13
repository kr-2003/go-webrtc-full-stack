# Video Conferencing Website

This repository contains a video conferencing website that allows users to communicate through video calls. The website utilizes various technologies and features to provide a seamless video conferencing experience.

## Tech Stacks

* WebRTC: WebRTC is a free and open-source project that provides real-time communication capabilities for web browsers and mobile applications.
* pion: pion is a Go library that simplifies the use of WebRTC in applications by providing a higher-level API.
* Frontend: The frontend of the website is built using React, a popular JavaScript library for building user interfaces, and Tailwind CSS, a utility-first CSS framework.
* Backend: The backend of the website is built using Go, a programming language known for its simplicity and efficiency. It leverages several libraries and frameworks, including webrtc, pion, Gin, Go Fiber, and Websockets.

## Features

1. User Registration and Login: Users can create an account and log in to the website using their credentials. This feature allows for personalized experiences and secure access to video conferencing functionality.
2. JWT Authentication: The website utilizes JSON Web Tokens (JWT) for authentication. After successful login, users receive a JWT, which is used to authenticate and authorize their requests to access protected resources.
3. Video Conferencing: The core functionality of the website is video conferencing. Users can initiate video calls with other participants, join existing video conferences, and communicate through audio and video streams in real time.
4. Call Controls: During a video call, users have access to various controls to manage their experience. They can mute/unmute their audio, enable/disable their video, and adjust video quality settings.
5. Screen Sharing: The website supports screen sharing, allowing participants to share their screen with others during a video call. This feature is useful for presentations, demonstrations, and collaborative work.
6. Chat Integration: Users can engage in text-based conversations through a built-in chat feature. This allows participants to exchange messages, share links, or discuss topics alongside the video call.
7. Recording: The website enables users to record video conferences for future reference or archiving purposes. Participants can start and stop recordings during a video call, and the recorded content is saved for later playback.
8. Real-Time Notifications: Users receive real-time notifications for various events, such as incoming call requests, chat messages, or changes in the video call status. This helps users stay informed and engaged during their video conferencing sessions.
9. Room Management: The website allows users to create and manage video conference rooms. Users can create new rooms, invite participants, set room access permissions, and customize room settings to suit their needs.
10. Responsive Design: The website is designed to be responsive, ensuring a seamless experience across different devices and screen sizes. Users can access video conferencing functionality from desktop computers, laptops, tablets, and smartphones.

## Getting Started

To set up and run the video conferencing website locally, follow these steps:

1. Clone the repository: `git clone https://github.com/example/video-conferencing-website.git`
2. Install the required dependencies for the frontend and backend:
   - Frontend: `cd video-conferencing-website/frontend` and then run `npm install`
   - Backend: `cd video-conferencing-website/backend` and then run `go get`
3. Configure the backend:
   - Set up the necessary environment variables, such as database connection details, JWT secret key, etc.
   - Configure any additional settings as per your requirements.
4. Build and start the frontend: `cd video-conferencing-website/frontend` and then run `npm
