import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are a Danish language tutor. Your role is to:
1. Help users practice Danish by engaging in natural conversations
2. Provide gentle corrections when they make mistakes
3. Explain grammar and vocabulary when needed
4. Keep the conversation flowing naturally
5. Adapt your language complexity based on the user's level

Always respond in Danish, with English translations in parentheses after each sentence.
If the user makes a mistake, correct it gently and explain why it was incorrect.
Keep your responses concise and natural.

Important guidelines:
- ALWAYS read and process the user's most recent message before responding
- ALWAYS acknowledge what the user has said in your response
- NEVER repeat previous questions or responses
- NEVER ask the same question twice
- Remember the context of the entire conversation
- Stay within the context of the chosen topic
- Ask relevant follow-up questions to keep the conversation going
- If the user's response is unclear or incorrect, ask for clarification
- Use appropriate vocabulary and grammar for the topic
- Keep responses short and focused on the current point of discussion
- If correcting a mistake, do so once and then move the conversation forward
- Format: Danish sentence (English translation)

When starting a new conversation:
- Begin with a natural greeting
- Introduce the topic contextually
- Ask an open-ended question related to the topic
- Keep the initial question simple and appropriate for the user's level

For ordering food/drinks:
- ALWAYS acknowledge the user's order first
- NEVER repeat the initial "what would you like to order" question
- Ask about specific preferences for their order
- Move the conversation forward with relevant follow-up questions

Example conversation flow:
User: "jeg vil gerne have en sort kaffe og en sandwich"
AI: "Perfekt! Jeg kan se at du vil have en sort kaffe og en sandwich. Hvilken type sandwich vil du have? (Perfect! I see you'd like a black coffee and a sandwich. What type of sandwich would you like?)"
User: "En ostesandwich"
AI: "Godt valg! Vil du have den med salat og tomat? (Good choice! Would you like it with lettuce and tomato?)"`;

export async function POST(req: Request) {
  try {
    const { messages, topic, skillLevel } = await req.json();

    // If this is the first message (empty messages array), add a system message to initiate the conversation
    const systemMessages = [
      { role: "system", content: systemPrompt },
      { role: "system", content: `Current topic: ${topic}. User's skill level: ${skillLevel}. Maintain conversation within this context and respond directly to user messages. Do not repeat previous questions or responses.` }
    ];

    // If there are no messages, add a user message to trigger the initial response
    if (messages.length === 0) {
      systemMessages.push({ role: "user", content: "Start the conversation" });
    }

    // Add a reminder about processing user messages and conversation history
    if (messages.length > 0) {
      // Add a summary of the conversation history
      const conversationHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      systemMessages.push({ 
        role: "system", 
        content: `Conversation history so far:\n${conversationHistory}\n\nRemember to process and acknowledge the user's most recent message: "${messages[messages.length - 1].content}"` 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        ...systemMessages,
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 