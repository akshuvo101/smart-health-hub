import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { AIChatService } from "@/services/ai-chat.service";

/**
 * GET
 * /api/chat/conversations/[id]
 *
 * Get a single conversation.
 */
export async function GET(
  _request: Request,
  context: RouteContext<
    "/api/chat/conversations/[id]"
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

    const chatService =
      new AIChatService(supabase);

    // ------------------------------------------
    // Get conversation
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
    // Success
    // ------------------------------------------

    return NextResponse.json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.error(
      "GET /api/chat/conversations/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch conversation.",
      },
      {
        status: 500,
      }
    );
  }
}


/**
 * DELETE
 * /api/chat/conversations/[id]
 *
 * Delete a conversation.
 */
export async function DELETE(
  _request: Request,
  context: RouteContext<
    "/api/chat/conversations/[id]"
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

    const chatService =
      new AIChatService(supabase);

    // ------------------------------------------
    // Get conversation
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
    // Delete conversation
    // ------------------------------------------

    await chatService.deleteConversation(id);

    // ------------------------------------------
    // Success
    // ------------------------------------------

    return NextResponse.json({
      success: true,
      message: "Conversation deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/chat/conversations/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete conversation.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PATCH
 * /api/chat/conversations/[id]
 *
 * Mark conversation as read.
 */
export async function PATCH(
  _request: Request,
  context: RouteContext<
    "/api/chat/conversations/[id]"
  >
) {
  try {
    const { id } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Conversation ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      await createClient();

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

    const chatService =
      new AIChatService(supabase);

    const conversation =
      await chatService.getConversation(id);

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Conversation not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      conversation.user_id !==
      user.id
    ) {
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

    const updatedConversation =
      await chatService.markConversationAsRead(
        id
      );

    return NextResponse.json({
      success: true,
      data: updatedConversation,
    });
  } catch (error) {
    console.error(
      "PATCH /api/chat/conversations/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update conversation.",
      },
      {
        status: 500,
      }
    );
  }
}