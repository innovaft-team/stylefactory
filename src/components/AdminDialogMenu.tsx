"use client";

import dynamic from "next/dynamic";
import { Blog } from "@/hooks/blog";
import { useMaybeSignedIn } from "@/hooks/useMaybeSignedIn";

/**
 * Same reasoning as `AdminPostControls`: `DialogMenu` reaches `UpdateBlogForm`
 * and therefore the whole md-editor-rt stack, but renders `null` unless
 * you're signed in. Kept off the post pages' critical path.
 */
const DialogMenu = dynamic(
  () => import("@/components/DialogMenu").then((m) => m.DialogMenu),
  { ssr: false },
);

interface AdminDialogMenuProps {
  blog: Blog;
  onDelete: () => void;
  path: string;
}

export const AdminDialogMenu = (props: AdminDialogMenuProps) => {
  const maybeSignedIn = useMaybeSignedIn();

  if (!maybeSignedIn) return null;

  return <DialogMenu {...props} />;
};
