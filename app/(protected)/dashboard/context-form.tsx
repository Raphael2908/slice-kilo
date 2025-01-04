'use server'
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from 'next/cache'


const ContextForm = async (user_id: string, formData: FormData): Promise<void> => {
    const supabase = await createClient()
    // check if ai agents exists in database
    const {data, error} = await supabase.from('ai_agents').select(`id, user_id`).eq('user_id', user_id)
    var rawFormData = {}
    // If don't exist
    if(data?.length == 0){
        rawFormData = {
            context: formData.get('context'),
            phone_number_id: formData.get('phone_number_id'),
            is_enabled: formData.get('is_enabled')== 'on' ? true : false,
            user_id: user_id
        } 
    }
    else {
        rawFormData = {
            id: data![0].id,
            context: formData.get('context'),
            phone_number_id: formData.get('phone_number_id'),
            is_enabled: formData.get('is_enable') == 'on' ? true : false,
            user_id: user_id
        } 
    }
    
    const agentRes = await supabase.from('ai_agents').upsert(rawFormData).select()
    const profileResult = await supabase.from('profiles').update({access_token: formData.get('access_token')}).eq('id', user_id)
    // if(res.error){
    //     return res.error
    // }
    revalidatePath('/dashboard')
    // return res.data
}

export default ContextForm