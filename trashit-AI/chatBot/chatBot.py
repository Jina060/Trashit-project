from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path
import openai
import os

# Load .env variables
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

print("Loaded API key:", os.getenv("OPENAI_API_KEY"))

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        if not req.message.strip():
            return {"error": "Message cannot be empty."}

        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": "You are TrashBot, a smart AI assistant for the TrashIt waste collection platform in Buea, Cameroon. Your job is to help users manage their trash collection needs. You can answer questions about scheduling pickups, subscription plans (on-demand, weekly, monthly), locating trash collectors, eco-friendly tips, and understanding their last and next pickup. Always respond clearly, helpfully, and in a friendly tone. Keep your answers short and to the point. If a user asks something outside of your role, politely tell them you're only trained for TrashIt-related support."
                },
                {
                    "role": "user", 
                    "content": req.message
                }
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}


