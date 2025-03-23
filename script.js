const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
const API_URL = 'https://api.openai.com/v1/chat/completions';

sendBtn.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Add user message to chat box
  appendMessage('user', userMessage);
  userInput.value = '';

  // Get AI response
  const aiResponse = await getAIResponse(userMessage);
  appendMessage('ai', aiResponse);
});

async function getAIResponse(userMessage) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo', // Use the GPT-3.5 model
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Sorry, something went wrong. Please try again.';
  }
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}