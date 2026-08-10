import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { AIChatService } from "@/services/ai-chat.service";

/**
 * GET
 * /api/chat/conversations/[id]/messages
 *
 * Returns all messages belonging to a conversation.
 */
export async function GET(
  _request: Request,
  context: RouteContext<
    "/api/chat/conversations/[id]/messages"
  >
) {
  try {
    const { id } = await context.params;

    // ------------------------------------------
    // Validate conversation ID
    // ------------------------------------------

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation ID is required.",
        },
        {
          status: 400,
        }
      );
    }

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
    // Verify conversation
    // ------------------------------------------

    const conversation =
      await chatService.getConversation(id);

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ------------------------------------------
    // Ownership check
    // ------------------------------------------

    if (conversation.user_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden.",
        },
        {
          status: 403,
        }
      );
    }

    // ------------------------------------------
    // Get messages
    // ------------------------------------------

    const messages =
      await chatService.getMessages(id);

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error(
      "GET /api/chat/conversations/[id]/messages error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch messages.",
      },
      {
        status: 500,
      }
    );
  }
}


/**
 * POST
 * /api/chat/conversations/[id]/messages
 *
 * Sends a user message and generates
 * an AI counselor response.
 */
export async function POST(
  request: Request,
  context: RouteContext<
    "/api/chat/conversations/[id]/messages"
  >
) {
  try {
    const { id } = await context.params;

    // ------------------------------------------
    // Validate conversation ID
    // ------------------------------------------

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation ID is required.",
        },
        {
          status: 400,
        }
      );
    }

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

    let body: {
      content?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    // ------------------------------------------
    // Validate message
    // ------------------------------------------

    const content = body.content?.trim();

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "Message content is required.",
        },
        {
          status: 400,
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
    // Verify conversation
    // ------------------------------------------

    const conversation =
      await chatService.getConversation(id);

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ------------------------------------------
    // Ownership check
    // ------------------------------------------

    if (conversation.user_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden.",
        },
        {
          status: 403,
        }
      );
    }

    // ------------------------------------------
    // Send message to AI
    // ------------------------------------------

    const result =
      await chatService.sendMessage({
        conversationId: id,
        content,
      });

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "POST /api/chat/conversations/[id]/messages error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}