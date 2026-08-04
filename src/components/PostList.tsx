import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Scroll } from "./layout/Scroll";
import { Blog, BlogBuckets } from "../hooks/useListBlogs";
import { PostItem } from "./PostItem";
import Link from "next/link";
import { getUniquePostSlug } from "@/utils/posts";

/**
 * A single value for every width, or a pair that switches at MOBILE_BREAKPOINT.
 * Not Chakra's `sm` token — that one is 480px, and we want 640px here.
 */
type ResponsiveSpacing = string | { mobile: string; desktop: string };

const MOBILE_BREAKPOINT = "640px";

const at = (value: ResponsiveSpacing, width: "mobile" | "desktop") =>
  typeof value === "string" ? value : value[width];

interface BlogListProps {
  blogs: Blog[];
  bucket: string;
  /**
   * Space above the first card / below the last one. Both default to the
   * shared values below; pass them from a page to tune that page on its own,
   * and pass `{mobile, desktop}` to split the value at 640px.
   */
  paddingTop?: ResponsiveSpacing;
  paddingBottom?: ResponsiveSpacing;
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

export const PostList = ({
  paddingTop = "176px",
  paddingBottom = "80px",
  ...props
}: BlogListProps) => {
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
    <Scroll pt={0} pb={0} px={"16px"} h="100vh" id={"blog-scroll"}>
      <VStack
        spacing={0}
        css={{
          direction: "ltr",
        }}
        alignItems={"stretch"}
        // sx, not __css: Stack emits its own `gap` from `spacing`, and a style
        // prop outranks __css — which silently zeroed the gap below 1024px.
        sx={{
          paddingTop: at(paddingTop, "mobile"),
          paddingBottom: at(paddingBottom, "mobile"),
          gap: "0px",
          [`@media screen and (min-width: ${MOBILE_BREAKPOINT})`]: {
            paddingTop: at(paddingTop, "desktop"),
            paddingBottom: at(paddingBottom, "desktop"),
          },
          "@media screen and (min-width: 768px)": {
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
              <div id={`blog-item`} style={{ overflow: "hidden" }}>
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
                    transition={"transform 0.7s ease"}
                    _hover={{
                      transform: "scale(1.02)",
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
