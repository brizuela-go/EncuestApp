# EncuestApp. Aplicación Web para la creación y gestión de encuestas

<!-- encuestapp logo -->
<p align="center">
  <img src="public/favicon.ico" alt="encuestapp logo" width="200" height="200">
</p>

<!-- shields.io badges -->

<p align="center" style="display: flex; flex-direction: row; gap: 1rem; justify-content: center; align-items: center;">
  <img src="https://img.shields.io/github/issues/brizuela-go/EncuestApp?style=flat-square&color=green" alt="issues">
  <img src="https://img.shields.io/github/forks/brizuela-go/EncuestApp?style=flat-square&color=orange" alt="forks">
  <img src="https://img.shields.io/github/stars/brizuela-go/EncuestApp?style=flat-square&color=yellow" alt="stars">
</p>

## 📌 Índice

- [🗒️ Descripción](#️-descripción)
- [📋 Requisitos](#-requisitos)
- [🚀 Instalación](#-instalación)
- [📁 Estructura de archivos](#-estructura-de-archivos)
- [📚 Tecnologías](#-tecnologías)
- [👨‍💻 Autores](#-autores)

## 🗒️ Descripción

## 📋 Requisitos

- [Node.js](https://nodejs.org/es/)
- [npm](https://www.npmjs.com/)

## 🚀 Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/brizuela-go/EncuestApp.git
```

2. Instalar las dependencias

```bash
npm install
```

3. Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
...
```

4. Ejecutar el proyecto

```bash
npm run dev
```

## 📁 Estructura de archivos

```
encuestApp
├─ .env
├─ .eslintrc
├─ .next
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ eslint
│  │  │  └─ .cache_1mzyvn0
│  │  ├─ images
│  │  ├─ development
│  │  ├─ media
│  │  └─ webpack
│  │     ├─ pages
│  └─ trace
├─ next-env.d.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ prettier.config.cjs
├─ public
│  ├─ cover-login.png
│  ├─ cover-register.png
│  ├─ favicon.ico
│  └─ logo.png
├─ README.md
├─ src
│  ├─ components
│  │  ├─ homeDashboard
│  │  │  ├─ LastWeek.tsx
│  │  │  ├─ Responses.tsx
│  │  │  ├─ HomeDashboardTable.tsx
│  │  ├─ Auth.tsx
│  │  ├─ CardQuestion.tsx
│  │  ├─ CompDash.tsx
│  │  ├─ CompMisEncuestas.tsx
│  │  ├─ CreadorDeEncuestas.tsx
│  │  ├─ DashboardLayout.tsx
│  │  ├─ DeleteModal.tsx
│  │  ├─ EncuLast5days.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Hero.tsx
│  │  ├─ index.ts
│  │  ├─ Layout.tsx
│  │  ├─ LoadingLogo.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ QuestionTypeDropdown.tsx
│  │  ├─ ShareModal.tsx
│  │  ├─ Signature.tsx
│  │  └─ SurveyComponent.tsx
│  ├─ firebase
│  │  └─ firebaseClient.tsx
│  ├─ pages
│  │  ├─ 404.tsx
│  │  ├─ api
│  │  │  └─ index.ts
|  |  |  └─ insight.ts
│  │  ├─ dashboard
│  │  │  ├─ crear-encuesta.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ myprofile.tsx
│  │  │  ├─ help.tsx
│  │  │  ├─ settings.tsx
│  │  │  └─ mis-encuestas
│  │  │     └─ index.tsx
│  │  │     ├─ [surveyID].tsx
│  │  ├─ encuestas
│  │  │  ├─ index.tsx
│  │  │  └─ [id].tsx
│  │  ├─ index.tsx
│  │  ├─ login
│  │  │  └─ index.tsx
│  │  ├─ payment
│  │  │  └─ index.tsx
│  │  ├─ politica-de-privacidad.tsx
│  │  ├─ register
│  │  │  └─ index.tsx
│  │  └─ _app.tsx
│  ├─ schemas
│  │  ├─ QuestionSchema.ts
│  │  ├─ SurveySchema.ts
│  │  ├─ UserLoggedInSchema.ts
│  │  └─ UserSchema.ts
│  ├─ stripe
│  │  ├─ createCheckoutSession.ts
│  │  ├─ initializeStripe.ts
│  │  ├─ isUserPremium.ts
│  │  └─ usePremiumStatus.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ utils
│     ├─ questionTypes.tsx
│     └─ regexps.ts
├─ tailwind.config.js
└─ tsconfig.json

```

## 📚 Tecnologías

- [Apex Charts](https://apexcharts.com/)
- [ESLint](https://eslint.org/)
- [Figma](https://www.figma.com/)
- [Firebase](https://firebase.google.com/)
- [Google Analytics](https://analytics.google.com/analytics/web/)
- [Headless UI](https://headlessui.dev/)
- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
- [Prettier](https://prettier.io/)
- [React](https://es.reactjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Stripe](https://stripe.com/es-es)
- [Tailwind CSS](https://tailwindcss.com/)
- [TensorFlow JS](https://www.tensorflow.org/js?hl=es-419)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)
- [Zod](https://zod.dev/)

## 👨‍💻 Autores

- [Brizuela González Juan Eduardo](https://github.com/brizuela-go)
- [Del Rosario Carmona David](https://github.com/DavidrCar)
- [Lugo Matchain Gustavo Stephano](https://github.com/stephano1111)
- [Meléndez Hernández Luis Abraham](https://github.com/abraham99mh)
