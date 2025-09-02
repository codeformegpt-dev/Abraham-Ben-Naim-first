import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
        auth: {
          persistSession: false
        }
      }
    )

    const { method } = req
    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/').filter(Boolean)
    
    if (method === 'GET') {
      // Get all settings or by section
      const section = url.searchParams.get('section')
      
      let query = supabaseClient
        .from('site_settings')
        .select('*')
        .order('section, key')

      if (section) {
        query = query.eq('section', section)
      }

      const { data, error } = await query

      if (error) throw error

      return new Response(
        JSON.stringify(data),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    if (method === 'PUT') {
      // Update setting
      const body = await req.json()
      const { section, key, value } = body

      const { data, error } = await supabaseClient
        .from('site_settings')
        .upsert({ section, key, value, updated_at: new Date().toISOString() })
        .select()

      if (error) throw error

      return new Response(
        JSON.stringify(data[0]),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    if (method === 'POST') {
      // Create new setting
      const body = await req.json()
      const { section, key, value } = body

      const { data, error } = await supabaseClient
        .from('site_settings')
        .insert({ section, key, value })
        .select()

      if (error) throw error

      return new Response(
        JSON.stringify(data[0]),
        {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 201,
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})