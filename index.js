import OpenAI from "openai";  

const client = new OpenAI();  

const response = await client.responses.create({ 
    model: "openai.gpt-oss-120b", 
    input: [ 
        { role: "user", content: "Write a one-sentence bedtime story about a unicorn." } 
    ] 
});  

console.log(response.output_text);