import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts";

const openAIApiKey = process.env.VITE_OPENAI_API_KEY

//create a llm
const llm = new ChatOpenAI({ openAIApiKey })

//create a prompt template, with one variable {sescription}
const tweetTemplate = 'Generate a promotional tweet for a product, from this product description: {productDesc}'

//create prompt from a template
const tweetPrompt = PromptTemplate.fromTemplate(tweetTemplate)
//??
const tweetChain = tweetPrompt.pipe(llm)

const response = await tweetChain.invoke({productDesc: 'Electric shoes'})

console.log(response.content)