import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No image selected.",
        },
        {
          status: 400,
        }
      );
    }

    const extension =
      file.name.split(".").pop() ?? "png";

    const filePath =
      `${user.id}/avatar.${extension}`;

    const { error: uploadError } =
      await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const { error: updateError } =
      await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      data: {
        avatar_url: publicUrl,
      },
      message:
        "Avatar uploaded successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to upload avatar.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

    if (profile?.avatar_url) {
      const url = new URL(profile.avatar_url);

      const path = url.pathname.split(
        "/object/public/avatars/"
      )[1];

      if (path) {
        await supabase.storage
          .from("avatars")
          .remove([path]);
      }
    }

    const { error } =
      await supabase
        .from("profiles")
        .update({
          avatar_url: null,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message:
        "Avatar removed successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to remove avatar.",
      },
      {
        status: 500,
      }
    );
  }
}