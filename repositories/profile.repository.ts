
import { createClient } from "@/lib/supabase/server";

import {
  Profile,
  UpdateProfilePayload,
} from "@/types/profile";

export class ProfileRepository {
  /**
   * Get current authenticated profile
   */
  static async getProfile(): Promise<Profile> {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Update profile
   */
  static async updateProfile(
    payload: UpdateProfilePayload
  ): Promise<Profile> {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: payload.full_name,

        // Optional academic information
        student_id:
          payload.student_id?.trim() || null,

        university:
          payload.university?.trim() || null,

        department:
          payload.department?.trim() || null,

        semester:
          payload.semester?.trim() || null,

        // Optional personal information
        phone:
          payload.phone?.trim() || null,

        gender:
          payload.gender?.trim()
            ? payload.gender.trim()
            : null,

        date_of_birth:
          payload.date_of_birth || null,

        bio:
          payload.bio?.trim() || null,

        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Upload avatar to Supabase Storage
   */
  static async uploadAvatar(
    userId: string,
    file: File
  ): Promise<string> {
    const supabase = await createClient();

    const extension =
      file.name.split(".").pop();

    const fileName =
      `${Date.now()}.${extension}`;

    const filePath =
      `${userId}/${fileName}`;

    const { error } =
      await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

    if (error) {
      throw error;
    }

    return filePath;
  }

  /**
   * Delete avatar from storage
   */
  static async removeAvatar(
    filePath: string
  ): Promise<void> {
    const supabase = await createClient();

    const { error } =
      await supabase.storage
        .from("avatars")
        .remove([filePath]);

    if (error) {
      throw error;
    }
  }

  /**
   * Update avatar URL in profile
   */
  static async updateAvatar(
    avatarUrl: string | null
  ): Promise<Profile> {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { data, error } =
      await supabase
        .from("profiles")
        .update({
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Check whether profile is complete
   *
   * Academic information is optional.
   */
  static async isProfileComplete(): Promise<boolean> {
    const profile =
      await this.getProfile();

    return Boolean(
      profile.full_name?.trim()
    );
  }
}