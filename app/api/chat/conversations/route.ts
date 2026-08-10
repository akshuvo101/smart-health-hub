import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { AIChatService } from "@/services/ai-chat.service";

import { CreateConversationInput } from "@/types/ai-chat";

/**
 * GET /api/chat/conversations
 *
 * Returns all conversations belonging
 * to the currently authenticated user.
 */
export async function GET() {
  try {
    // ------------------------------------------
    // Supabase
    // ------------------------------------------

    const supabase = await createClient();

    // ------------------------------------------
    // Authentication
    // ------------------------------------------

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // ------------------------------------------
    // Service
    // ------------------------------------------

    const chatService = new AIChatService(
      supabase
    );

    // ------------------------------------------
    // Get conversations
    // ------------------------------------------

    const conversations =
      await chatService.getConversations(
        user.id
      );

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return NextResponse.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    console.error(
      "GET /api/chat/conversations error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch conversations.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST /api/chat/conversations
 *
 * Creates a new conversation.
 */
export async function POST(
  request: Request
) {
  try {
    // ------------------------------------------
    // Supabase
    // ------------------------------------------

    const supabase = await createClient();

    // ------------------------------------------
    // Authentication
    // ------------------------------------------

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // ------------------------------------------
    // Request body
    // ------------------------------------------

    let body: CreateConversationInput = {};

    try {
      body = await request.json();
    } catch {
      // Empty body is allowed.
    }

    // ------------------------------------------
    // Service
    // ------------------------------------------

    const chatService =
      new AIChatService(supabase);

    // ------------------------------------------
    // Create conversation
    // ------------------------------------------

    const conversation =
      await chatService.createConversation(
        user.id,
        {
          title:
            body.title?.trim() ||
            "New Conversation",

          assessment_id:
            body.assessment_id ?? null,
        }
      );

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return NextResponse.json(
      {
        success: true,
        data: conversation,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/chat/conversations error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create conversation.",
      },
      {
        status: 500,
      }
    );
  }
}