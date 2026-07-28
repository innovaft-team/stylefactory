import { Box } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { Blog } from "../hooks/useListBlogs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getPostMarkdown, renderMarkdownToHtml } from "@/utils/posts";

const AnimatedBox = motion(Box);

export async function getPostMdData(content: string) {
  return renderMarkdownToHtml(content);
}

export const usePostMdData = (data: Blog) => {
  const { locale } = useRouter();
  const content = getPostMarkdown(data, locale);

  return useQuery({
    queryKey: ["postMdData", data.id, locale],
    queryFn: () => getPostMdData(content),
  });
};
