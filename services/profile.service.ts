
import { ProfileRepository } from "@/repositories/profile.repository";

import {
  Profile,
  UpdateProfilePayload,
} from "@/types/profile";

export class ProfileService {
  /**
   * Get current user profile
   */
  static async getProfile(): Promise<Profile> {
    return await ProfileRepository.getProfile();
  }

  /**
   * Update profile
   */
  static async updateProfile(
    payload: UpdateProfilePayload
  ): Promise<Profile> {
    /**
     * Normalize text fields
     */
    payload.full_name =
      payload.full_name?.trim() || "";

    payload.student_id =
      payload.student_id?.trim() || "";

    payload.university =
      payload.university?.trim() || "";

    payload.department =
      payload.department?.trim() || "";

    payload.semester =
      payload.semester?.trim() || "";

    payload.phone =
      payload.phone?.trim() || "";

    payload.bio =
      payload.bio?.trim() || "";

    /**
     * Required field
     *
     * Only full name is required.
     */
    if (!payload.full_name) {
      throw new Error(
        "Full name is required."
      );
    }

    /**
     * Academic information is optional.
     *
     * Student ID validation only runs
     * when a Student ID is provided.
     */
    if (
      payload.student_id &&
      !/^\d+$/.test(payload.student_id)
    ) {
      throw new Error(
        "Student ID must contain only numbers."
      );
    }

    /**
     * Phone validation
     */
    if (
      payload.phone &&
      !/^[0-9+\-\s()]+$/.test(payload.phone)
    ) {
      throw new Error(
        "Invalid phone number."
      );
    }

    return await ProfileRepository.updateProfile(
      payload
    );
  }

  /**
   * Upload avatar
   */
  static async uploadAvatar(
    file: File
  ): Promise<Profile> {
    const profile =
      await ProfileRepository.getProfile();

    /**
     * Validation
     */
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Only JPG, PNG and WebP images are allowed."
      );
    }

    const maxSize =
      2 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error(
        "Image size must not exceed 2 MB."
      );
    }

    /**
     * Remove previous avatar
     */
    if (profile.avatar_url) {
      try {
        const path =
          profile.avatar_url
            .split("/avatars/")
            .pop();

        if (path) {
          await ProfileRepository.removeAvatar(
            path
          );
        }
      } catch {
        // Ignore delete errors
      }
    }

    /**
     * Upload new avatar
     */
    const filePath =
      await ProfileRepository.uploadAvatar(
        profile.id,
        file
      );

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const avatarUrl =
      `${supabaseUrl}/storage/v1/object/public/avatars/${filePath}`;

    return await ProfileRepository.updateAvatar(
      avatarUrl
    );
  }

  /**
   * Remove avatar
   */
  static async removeAvatar(): Promise<Profile> {
    const profile =
      await ProfileRepository.getProfile();

    if (profile.avatar_url) {
      const path =
        profile.avatar_url
          .split("/avatars/")
          .pop();

      if (path) {
        await ProfileRepository.removeAvatar(
          path
        );
      }
    }

    return await ProfileRepository.updateAvatar(
      null
    );
  }

  /**
   * Check profile completion
   */
  static async isProfileComplete(): Promise<boolean> {
    return await ProfileRepository.isProfileComplete();
  }
}