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
    
    if (method === 'GET') {
      // Get images
      const section = url.searchParams.get('section')
      
      let query = supabaseClient
        .from('site_images')
        .select('*')
        .order('display_order', { ascending: true })

      if (section) {
        query = query.eq('section', section)
      }

      const { data, error } = await query

      if (error) throw error

      return new Response(
        JSON.stringify(data || []),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Protected operations require authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    if (method === 'POST') {
      // Create image
      const body = await req.json()
      let { section, key, image_url, alt_text, display_order } = body

      // If image_url doesn't start with http, treat it as a description for Stable Diffusion
      if (!image_url.startsWith('http')) {
        // Generate Stable Diffusion URL
        const prompt = encodeURIComponent(image_url)
        const uniqueId = `${section}_${key}_${Date.now()}`
        image_url = `https://readdy.ai/api/search-image?query=${prompt}&width=800&height=600&seq=${uniqueId}&orientation=landscape`
      }

      const { data, error } = await supabaseClient
        .from('site_images')
        .insert({ 
          section, 
          key, 
          image_url, 
          alt_text, 
          display_order: display_order || 0
        })
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

    if (method === 'PUT') {
      // Update image
      const pathSegments = url.pathname.split('/').filter(Boolean)
      const id = pathSegments[pathSegments.length - 1]
      
      const body = await req.json()
      let { section, key, image_url, alt_text, display_order } = body

      // If image_url doesn't start with http, treat it as a description for Stable Diffusion
      if (!image_url.startsWith('http')) {
        // Generate Stable Diffusion URL
        const prompt = encodeURIComponent(image_url)
        const uniqueId = `${section}_${key}_${Date.now()}`
        image_url = `https://readdy.ai/api/search-image?query=${prompt}&width=800&height=600&seq=${uniqueId}&orientation=landscape`
      }

      const { data, error } = await supabaseClient
        .from('site_images')
        .update({ 
          section, 
          key, 
          image_url, 
          alt_text, 
          display_order,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
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

    if (method === 'DELETE') {
      // Delete image
      const pathSegments = url.pathname.split('/').filter(Boolean)
      const id = pathSegments[pathSegments.length - 1]

      const { error } = await supabaseClient
        .from('site_images')
        .delete()
        .eq('id', id)

      if (error) throw error

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
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