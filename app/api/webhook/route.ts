import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({organization: process.env.OPEN_AI_API_PROJECT, project: process.env.OPEN_AI_PROJECT, apiKey: process.env.OPEN_AI_API_KEY});

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const challenge = requestUrl.searchParams.get('hub.challenge')
    
    return NextResponse.json(Number(challenge))
}

export async function POST(request:NextRequest) {
    const supabase = await createClient()
    const body = await request.json()
    // verify request against phone_number_id
    const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id
    // get context
    const { data: { user },} = await supabase.auth.getUser();
    // if (!user) {
    //     return redirect("/sign-in");
    // } 
    const { data, error } = await supabase.from('ai_agents').select(`context, phone_number_id, profiles(access_token)`).eq('phone_number_id', phone_number_id).returns<any>()
    if(!data){
        throw new Error('No ai agent found or something when wrong when querying data')
    }
    const ai_agent_data = data

    const access_token = data![0].profiles.access_token
    if(!ai_agent_data){
        throw new Error('No ai agent found')
    }

    // console.log(body.entry[0].changes[0].value.messages[0])
    // console.log(body.entry[0].changes[0].value.metadata.phone_number_id)
    // If it's a message from user
    
    if(body.entry[0].changes[0].value.messages){
        const data = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: body.entry[0].changes[0].value.messages[0].from,
            type: "text",
            text: {
                preview_url: false,
                body: 'Hello back!'
                }
        };
        const assistant = await openai.beta.assistants.create({
        name: "Cafe assistant",
        tools: [],
        model: "gpt-4o"
      });
        const thread = await openai.beta.threads.create();
        const message = await openai.beta.threads.messages.create(
            thread.id,
            {role: 'user', content: body.entry[0].changes[0].value.messages[0].text.body},
        );
        let run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            { 
              assistant_id: assistant.id,
              instructions: ai_agent_data[0].context,
            }
        );

        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(
              run.thread_id
            );
            // for (const message of messages.data.reverse()) {
            //   console.log(`${message.role} > ${message.content[0].text.value}`);
            // }
            // Check type of content
            if(messages.data[0].content[0].type === 'text'){
                console.log(messages.data[0].content[0].text.value)
                data.text.body = messages.data[0].content[0].text.value
            }
            } else {
            console.log(run.status);
        }
        await fetch('https://graph.facebook.com/v21.0/505011889362703/messages', {method: 'POST',headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }, body:JSON.stringify(data)})
        return NextResponse.json({'status': 200})
    }
    // If it's a message we sent
    else if(body.entry[0].changes[0].value.statuses[0].status == 'delivered'){
        console.log(body.entry[0].changes[0].value.messages)
        return NextResponse.json({'status': 200})
    }
    else {
        NextResponse.json({'status': 404, body: 'Post request not found'})
    }
    return NextResponse.json({'status': 500})
}
