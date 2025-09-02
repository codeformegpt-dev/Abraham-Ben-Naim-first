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
      // Get testimonials
      const featured = url.searchParams.get('featured')
      
      let query = supabaseClient
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true })

      if (featured === 'true') {
        query = query.eq('is_featured', true)
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
      // Create testimonial
      const body = await req.json()
      const { name, role, company, content, image_url, rating, is_featured, display_order } = body

      const { data, error } = await supabaseClient
        .from('testimonials')
        .insert({ 
          name, 
          role, 
          company, 
          content, 
          image_url, 
          rating: rating || 5, 
          is_featured: is_featured || false,
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
      // Update testimonial
      const pathSegments = url.pathname.split('/').filter(Boolean)
      const id = pathSegments[pathSegments.length - 1]
      
      const body = await req.json()
      const { name, role, company, content, image_url, rating, is_featured, display_order } = body

      const { data, error } = await supabaseClient
        .from('testimonials')
        .update({ 
          name, 
          role, 
          company, 
          content, 
          image_url, 
          rating, 
          is_featured,
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
      // Delete testimonial
      const pathSegments = url.pathname.split('/').filter(Boolean)
      const id = pathSegments[pathSegments.length - 1]

      const { error } = await supabaseClient
        .from('testimonials')
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