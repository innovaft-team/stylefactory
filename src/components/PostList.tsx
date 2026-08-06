import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Scroll } from "./layout/Scroll";
import { Blog, BlogBuckets } from "../hooks/blog";
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

/**
 * Fades each card out as it scrolls past the top of the container.
 *
 * The measurement is unchanged; the scheduling is not. This used to run
 * synchronously on every scroll event and interleave reads
 * (`getBoundingClientRect`, `offsetHeight`) with writes (`style.opacity`),
 * forcing a layout per card per event. Now it coalesces to one pass per
 * animation frame and does all the reads before any of the writes.
 */
function updateCardOpacity() {
  const scrollableContainer = document.getElementById("blog-scroll");
  if (!scrollableContainer) return;

  const elements = document.querySelectorAll<HTMLElement>("#blog-item");
  if (!elements.length) return;

  const scrollTop = scrollableContainer.scrollTop;

  const measurements = Array.from(elements, (element) => ({
    element,
    distanceToTop: scrollTop + element.getBoundingClientRect().top,
    elementHeight: element.offsetHeight,
  }));

  for (const { element, distanceToTop, elementHeight } of measurements) {
    let opacity = 1;

    if (scrollTop > distanceToTop && elementHeight > 0) {
      opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
    }

    if (opacity >= 0) {
      element.style.opacity = opacity.toString();
    }
  }
}

function createScrollHandler() {
  let frame = 0;

  const handler = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      updateCardOpacity();
    });
  };

  handler.cancel = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  return handler;
}

export const PostList = ({
  paddingTop = "176px",
  paddingBottom = "80px",
  ...props
}: BlogListProps) => {
  useEffect(() => {
    const scrollElement = document.getElementById("blog-scroll");
    if (!scrollElement) return;

    const scrollHandler = createScrollHandler();
    scrollElement.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      scrollHandler.cancel();
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
                    <PostItem data={item} priority={index < 2} />
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
