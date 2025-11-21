// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// interface SubscribeRequest {
//   email: string;
//   source?: string;
// }

// const handler = async (req: Request): Promise<Response> => {
//   // Handle CORS preflight requests
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { email, source = 'website' }: SubscribeRequest = await req.json();

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !emailRegex.test(email)) {
//       return new Response(
//         JSON.stringify({ error: "Invalid email address" }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json", ...corsHeaders },
//         }
//       );
//     }

//     // Initialize Supabase client
//     const supabaseClient = createClient(
//       Deno.env.get("SUPABASE_URL") ?? "",
//       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
//     );

//     // Check if email already exists
//     const { data: existingSubscription, error: checkError } = await supabaseClient
//       .from("newsletter_subscriptions")
//       .select("email, status")
//       .eq("email", email)
//       .maybeSingle();

//     if (checkError) {
//       console.error("Error checking existing subscription:", checkError);
//       throw checkError;
//     }

//     if (existingSubscription) {
//       if (existingSubscription.status === "active") {
//         return new Response(
//           JSON.stringify({ 
//             message: "You're already subscribed to our newsletter!",
//             already_subscribed: true 
//           }),
//           {
//             status: 200,
//             headers: { "Content-Type": "application/json", ...corsHeaders },
//           }
//         );
//       } else {
//         // Reactivate subscription
//         const { error: updateError } = await supabaseClient
//           .from("newsletter_subscriptions")
//           .update({ 
//             status: "active",
//             subscribed_at: new Date().toISOString()
//           })
//           .eq("email", email);

//         if (updateError) {
//           console.error("Error reactivating subscription:", updateError);
//           throw updateError;
//         }

//         return new Response(
//           JSON.stringify({ 
//             message: "Welcome back! Your subscription has been reactivated.",
//             reactivated: true 
//           }),
//           {
//             status: 200,
//             headers: { "Content-Type": "application/json", ...corsHeaders },
//           }
//         );
//       }
//     }

//     // Create new subscription
//     const { error: insertError } = await supabaseClient
//       .from("newsletter_subscriptions")
//       .insert({
//         email,
//         source,
//         status: "active",
//       });

//     if (insertError) {
//       console.error("Error creating subscription:", insertError);
//       throw insertError;
//     }

//     console.log("Newsletter subscription created:", email);

//     return new Response(
//       JSON.stringify({ 
//         message: "Successfully subscribed to our newsletter!",
//         success: true 
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json", ...corsHeaders },
//       }
//     );
//   } catch (error: any) {
//     console.error("Error in subscribe-newsletter function:", error);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json", ...corsHeaders },
//       }
//     );
//   }
// };

// serve(handler);
