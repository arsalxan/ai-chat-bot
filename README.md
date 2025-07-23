# AI Chatbot

This is a simple AI chatbot application.

## Setup

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add your API key(s).

    - **For Google Gemini:**
      ```
      GEMINI_API_KEY=your_gemini_key
      ```
    - **For OpenAI:**
      ```
      OPENAI_API_KEY=your_openai_key
      ```

4.  The backend is configured to use the Google Gemini API by default. To switch to the OpenAI API, you will need to modify the `backend/routes/chat.js` file. Comment out the Gemini API code and uncomment the OpenAI API code.

5.  Start the server:
    ```bash
    npm start
    ```
