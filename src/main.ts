import { openAIApiKey } from "./constants"
import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai"
document.addEventListener('submit', (e) => {
  e.preventDefault()
  progressConversation()
})

const llm = new ChatOpenAI({ openAIApiKey })

// A string holding the phrasing of the prompt
const standaloneQuestionTemplate ='translate this text into a standalone question :{text}';

// A prompt created using PromptTemplate and the fromTemplate method
const standaloneQuestionPrompt=PromptTemplate.fromTemplate(standaloneQuestionTemplate);

// Take the standaloneQuestionPrompt and PIPE the model
const standaloneQuestionChain=standaloneQuestionPrompt.pipe(llm);

// Await the response when you INVOKE the chain. 
// Remember to pass in a question.
const response=await standaloneQuestionChain.invoke({text:"i wanted to get it but be caise i'm not sure , i may wanted to return them because i don't know any thing about return policy of ur shop"});

console.log(response)

// -------------------------------------------------------
async function progressConversation() {
  const userInput = document.getElementById('user-input') as HTMLInputElement
  const chatbotConversation = document.getElementById('chatbot-conversation-container') as HTMLDivElement
  const question = userInput?.value
  userInput.value = ''

  // add human message
  const newHumanSpeechBubble = document.createElement('div') as HTMLDivElement
  newHumanSpeechBubble.classList.add('speech', 'speech-human')
  chatbotConversation?.appendChild(newHumanSpeechBubble)
  newHumanSpeechBubble.textContent = question
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight

  // add AI message
  const newAiSpeechBubble = document.createElement('div')
  newAiSpeechBubble.classList.add('speech', 'speech-ai')
  chatbotConversation.appendChild(newAiSpeechBubble)
  
  newAiSpeechBubble.textContent = "cool";
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight
}