# English-Avator

An interactive program to **learn English** with a 3D animated avatar.  
This project aims to make learning more **immersive** and **motivating**, through interactive lessons and an avatar that speaks and reacts in real-time.

---

## ✨ Features
- 👩‍🏫 3D animated avatar (via Three.js and GLTF)
- 🎤 Voice recognition (Web Speech API)
- 🔊 Text-to-Speech (listen to correct pronunciation)
- 📚 Interactive quizzes and exercises
- 📈 Progress tracking for learners
- ✨ Animated star background
- 🤖 Real AI integration with OpenAI
- ⭐ Star score system with local persistence
- 💬 Interactive AI chat interface

---

## 🚀 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/rouleauphilippe2026-hub/English-Avator.git
   ```
2. Install dependencies (Node.js and npm required):
   ```bash
   cd English-Avator
   npm install
   ```
3. For local development, start the application:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment on Vercel

This application is designed to be deployed on Vercel with serverless functions.

1. Deploy to Vercel:
   ```bash
   vercel
   ```

2. **Important**: Set the `OPENAI_API_KEY` environment variable in your Vercel project settings:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add a new variable:
     - Name: `OPENAI_API_KEY`
     - Value: Your OpenAI API key (get one from https://platform.openai.com/api-keys)
   - Save and redeploy

Without the `OPENAI_API_KEY` environment variable, the AI chat will display a configuration error message.

---

## 🕹️ Usage

- Follow on-screen instructions to interact with the avatar.
- Use your microphone for speaking exercises.
- Listen and repeat with Text-to-Speech.
- Complete quizzes to track your progress.

---

## 💡 Contributing

Contributions are welcome!  
Feel free to fork the project, open issues, or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

Philippe Rouleau ([rouleauphilippe2023-oss](https://github.com/rouleauphilippe2023-oss))