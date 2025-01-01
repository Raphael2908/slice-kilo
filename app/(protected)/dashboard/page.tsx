import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import ContextForm from "./context-form";
import { redirect } from "next/navigation";
import Form from 'next/form'


export default async function Dashboard() {
  const supabase = await createClient() 
  const {data: user_data, error: user_error} = await supabase.auth.getUser()

  const {data, error} = await supabase.from('ai_agents').select(`context, phone_number_id, is_enabled, user_id`).eq('user_id', user_data.user?.id)
  if(!user_data){
    redirect('/login')
  }

  if(!data){
    return (
      <h1>Something went wrong</h1>
    )
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-4">
      <h1 className="text-lg font-bold">AI Settings</h1>
      <Form className=" flex flex-col gap-2" action={ContextForm.bind(null, user_data.user.id)}>
          <Label htmlFor="message">Phone number id</Label>
          <Input defaultValue={data[0].phone_number_id} type="number" name="phone_number_id" placeholder="phone" />
          <div className="flex items-center space-x-2">
            <Label htmlFor="enable-ai">Enable AI</Label>
            <Switch defaultChecked={data[0].is_enabled} name="is_enabled" id="enable-ai"/>
          </div>
          <Label htmlFor="message">Context data for AI</Label>
          <Textarea className="h-72" defaultValue={data[0].context} name="context"/>
          <Button type="submit" className="w-full">Save settings</Button>
      </Form>
    
    </div>

  );
}
