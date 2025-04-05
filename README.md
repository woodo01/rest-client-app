# graphiql-app

## 📌 Project Description
This application mimics core functionalities of REST clients like Postman or Thunder Client. It allows users to test REST APIs by constructing and sending requests with different methods, headers, and payloads. Features include:

Authentication (Firebase)

REST Client with method, URL, headers, and body inputs

Generated code section for multiple languages

Request history (stored in local storage)

Variables support (with template-like syntax: {{variable}})

Internationalization (2+ languages)

Error handling and private routes

Responsive, accessible design


## 🚀 Live Demo 
🔗 Deployed Link tbd

## 📽️ Presentation Video
🎥 YouTube Video (Short tbd)

## 👥 Team Members
Andrey Tishchenko

Ivan Sigaev

Joelle Marianek

## 📁 Repository Structure
main – contains only this README

develop – main development branch

Other feature branches follow Git Flow.

## 🔗 Useful Links
[📝 Task Description](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md)

[🎯 GitHub Projects Board](https://github.com/users/woodo01/projects/1)

[🔄 Retro Board](https://trello.com/b/zuz53dWh/retro)


## 🧪 Run Locally
Prerequisites
Node.js 18+
Yarn / npm
Firebase setup (with credentials)

<pre> ```bash git clone https://github.com/your-org/rest-client-app.git cd rest-client-app npm install npm run dev ``` </pre>

## 📦 Scripts
bash
npm run dev             # run dev server
npm run build           # production build
npm run test            # run tests
npm run lint            # run ESLint
npm run prettier-fix    # auto-format code

## 🔐 Authentication
Implemented using [Firebase] with email/password. Client-side validation ensures security and usability.

## 🧪 Testing
Testing library: [Jest, React Testing Library]

Coverage: tbd

Husky hooks:

pre-commit: lint

pre-push: test

## 🌍 Internationalization
Supports at least 2 languages (English and German).

## 📜 License
MIT – free to use and modify.