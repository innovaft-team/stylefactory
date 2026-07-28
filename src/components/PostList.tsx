import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Scroll } from "./layout/Scroll";
import { Blog, BlogBuckets } from "../hooks/useListBlogs";
import { PostItem } from "./PostItem";
import Link from "next/link";
import { getUniquePostSlug } from "@/utils/posts";

interface BlogListProps {
  blogs: Blog[];
  bucket: string;
}

function scrollHandler() {
  const scrollableContainer = document.getElementById("blog-scroll");
  const elements = document.querySelectorAll("#blog-item");

  if (!elements || !scrollableContainer) return;

  // @ts-ignore
  elements.forEach((element: HTMLElement) => {
    const distanceToTop =
      scrollableContainer.scrollTop + element.getBoundingClientRect().top;
    const elementHeight = element.offsetHeight;
    const scrollTop = scrollableContainer.scrollTop;
    let opacity = 1;
    //
    if (scrollTop > distanceToTop) {
      opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
    }
    //
    if (opacity >= 0) {
      element.style.opacity = opacity.toString();
    }
  });
}

export const PostList = (props: BlogListProps) => {
  useEffect(() => {
    const scrollElement = document.getElementById("blog-scroll");
    if (!scrollElement) return;
    scrollElement.addEventListener("scroll", scrollHandler);

    return () => {
      scrollElement.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const page = props.bucket === BlogBuckets.blogs ? "blog" : "trends";

  return (
    <Scroll
      pt={{ base: "0", md: "150px" }}
      px={{ base: "5", md: "20" }}
      h="100vh"
      id={"blog-scroll"}
    >
      <VStack
        spacing={10}
        css={{
          direction: "ltr",
        }}
        alignItems={"stretch"}
        __css={{
          "@media screen and (min-width: 48em)": {
            "& > div:nth-of-type(even)": {
              marginLeft: "auto",
            },
            "& > div:nth-of-type(odd)": {
              marginRight: "auto",
            },
          },
        }}
      >
        {props.blogs?.map((item, index) => {
          const slug = getUniquePostSlug(item, props.blogs);

          return (
            <AnimatePresence key={item.id}>
              <div id={`blog-item`}>
                <Link
                  id={item.id}
                  href={{
                    pathname: `/${page}/[id]`,
                    query: {
                      id: slug,
                    },
                  }}
                >
                  <Box
                    position={"relative"}
                    key={`${index}-blog`}
                    _hover={{
                      transform: "scale(1.05)",
                      transitionDuration: "0.7s",
                    }}
                  >
                    <PostItem data={item} />
                  </Box>
                </Link>
              </div>
            </AnimatePresence>
          );
        })}
      </VStack>
    </Scroll>
  );
};
