# New App

## Introduction

New App is a web application that allows users to generate ready-made blog posts with articles and images on any topic they choose. It leverages AI to create rich content and illustrative images, providing a seamless experience for content creation.

## User Journey

### 1. Sign In

1. When you open the app, you will be prompted to sign in with ZAPT.
2. Click on "Sign in with ZAPT" and choose your preferred authentication method (Email magic link, Google, Facebook, or Apple).
3. Once authenticated, you will be redirected to the home page.

### 2. Generate a Blog Post

1. On the home page, you will see an input field labeled "Enter a topic...".
2. Type in the topic you would like to generate a blog post about. For example: "The importance of renewable energy".
3. Click the "Generate Blog Post" button. The button has a loading state and will show "Generating..." while the content is being created.
4. The app will generate an article and an image related to your topic.

### 3. View Generated Content

1. Once the generation is complete, the app will display the generated blog post and image.
2. The blog post is rendered with proper formatting, headings, and paragraphs.
3. The image is displayed below the article, providing a visual complement to the content.

### 4. Generate Additional Content (Optional)

1. If you wish to generate another blog post, simply change the topic and click "Generate Blog Post" again.
2. Each new generation will replace the previous content displayed.

### 5. Sign Out

1. When you are done, you can sign out by clicking the "Sign Out" button at the top right corner of the page.

## Features

- **AI-Powered Content Generation**: Leverages AI to create detailed articles on any topic.
- **Automatic Image Generation**: Generates an illustrative image related to the article.
- **Responsive Design**: The app is fully responsive and works well on all screen sizes.
- **User Authentication**: Secure sign-in with ZAPT using various providers (Email, Google, Facebook, Apple).
- **Loading States**: Buttons have loading states to prevent multiple submissions and provide user feedback.

## External Services Used

- **ZAPT AI**: Used for user authentication and event handling. It facilitates secure login and interaction with AI services.
- **ChatGPT (chatgpt_request event)**: Generates the markdown-formatted blog article based on the user's topic.
- **Image Generation (generate_image event)**: Creates an illustrative image corresponding to the topic.
- **Supabase**: Used for authentication services and managing user sessions.
- **Progressier**: Adds Progressive Web App (PWA) functionality to the app.
- **Sentry**: For error logging and monitoring both frontend and backend.

## Notes

- The app requires an internet connection to generate content.
- All generated content is fresh and unique based on the provided topic.
- The app is free to use.