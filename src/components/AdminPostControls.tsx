"use client";

import dynamic from "next/dynamic";
import { useMaybeSignedIn } from "@/hooks/useMaybeSignedIn";

/**
 * `CreateBlogFormModal` pulls in md-editor-rt (and with it CodeMirror,
 * mermaid, katex, highlight.js, prettier and cropperjs) plus react-hook-form
 * and the Firebase SDK — around 1 MB of JavaScript and a 87 KB stylesheet.
 *
 * It renders `null` for everyone who isn't signed in, which is every real
 * visitor. Loading it lazily *and* behind an auth probe keeps all of that off
 * the critical path: the admin sees the same button a moment later, everyone
 * else never pays for it.
 */
const CreateBlogFormModal = dynamic(
  () => import("@/components/CreateBlogForm").then((m) => m.CreateBlogFormModal),
  { ssr: false },
);

interface AdminPostControlsProps {
  path: string;
}

export const AdminPostControls = ({ path }: AdminPostControlsProps) => {
  const maybeSignedIn = useMaybeSignedIn();

  if (!maybeSignedIn) return null;

  return <CreateBlogFormModal path={path} />;
};
