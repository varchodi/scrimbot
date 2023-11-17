import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from "@supabase/supabase-js";
import { sbApiKey, sbUrl,openAIApiKey } from "../constants";

export const start_db = async () => {
    try {
        //text spliting 
        const result = await fetch('/src/data/informations.txt');
        const text = await result.text()
        //-- spliter text options
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50,
            separators: ['\n\n', '\n', ' ', ''] // default setting
        })
        //?? split text and create a document from it
        const output = await splitter.createDocuments([text])


        //init superbase client
        const client = createClient(sbUrl, sbApiKey);


        //push embedings in a supabase table
        //create supabase vector store

        await SupabaseVectorStore.fromDocuments(
            output,
            //create embedings from file chunks 
            new OpenAIEmbeddings({ openAIApiKey }),
            {
                client,
                //specify the tablename
                tableName:"documents"
            }
        )
        
    } catch (error) {
        console.log("An error accured");
        console.log(error);
    }

}

