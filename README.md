# Moodify

Moodify is a mood-based recommendation application built with Node.js, HTML, CSS, and JavaScript.

Users select how they are feeling and receive a matching playlist, activity, and encouraging message. Mood selections are also saved to a local history file.

## Live Demo

Deployment link coming soon.

## Features

- Select from six moods
- Receive a playlist recommendation
- Receive a suggested activity
- Receive an encouraging message
- Save mood history to a text file
- Responsive interface for desktop and mobile
- Loading and error states
- Client-to-server communication using the Fetch API

## Technologies Used

- Node.js
- Native Node HTTP module
- JavaScript
- HTML5
- CSS3
- Fetch API
- JSON
- File System module (`fs`)
- Git

## Project Purpose

Moodify was built to learn Node.js and HTTP fundamentals without using Express.

The project began as a command-line application and was later expanded into a browser-based web application.

Building the server with Node's native `http` module provided hands-on practice with:

- Manual routing
- Serving HTML, CSS, and JavaScript files
- GET and POST requests
- Parsing JSON request bodies
- Sending JSON responses
- File-based data persistence
- Reusable Node modules
- Client-server communication

## Project Progression

### Version 1: Command-Line Arguments

The first version accepted a mood through `process.argv`.

```bash
node moodify.js happy
```
