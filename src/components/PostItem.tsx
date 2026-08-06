import { Box, chakra, StackProps, VStack } from "@chakra-ui/react";
import type { ComponentProps } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { Blog } from "../hooks/blog";
import { useRouter } from "next/router";
import { useVideoAutoPlayback } from "@/hooks/useVideoAutoPlayback";

interface PostItemProps extends StackProps {
  data: Blog;
  priority?: boolean;
}

const MotionStack = motion(VStack);

/**
 * The intrinsic size next/image needs, carried under names chakra won't claim.
 *
 * `width` and `height` are chakra *style* props — passing them through would
 * emit `width: 1500px; height: 875px` and override the `w`/`h` that give the
 * card its `100%` / `auto` box. Chakra's own Image component sidesteps this
 * the same way, with `htmlWidth`/`htmlHeight`.
 */
const NextImageWithIntrinsicSize = ({
  htmlWidth,
  htmlHeight,
  ...rest
}: Omit<ComponentProps<typeof NextImage>, "width" | "height"> & {
  htmlWidth: number;
  htmlHeight: number;
}) => <NextImage width={htmlWidth} height={htmlHeight} {...rest} />;

/**
 * next/image with chakra style props.
 *
 * `@chakra-ui/next-js`'s own `Image` can't be used: under Next 14.2 it throws
 * "element type is invalid" during production SSR (it resolves next/image to a
 * module namespace rather than the component). It only ever worked here
 * because `as={motion.img}` meant the wrapped next/image never rendered.
 * Wrapping the import ourselves gives the same styling API without the bug.
 */
const ChakraNextImage = chakra(NextImageWithIntrinsicSize, {
  shouldForwardProp: (prop) =>
    [
      "src",
      "alt",
      "htmlWidth",
      "htmlHeight",
      "sizes",
      "quality",
      "priority",
      "loading",
      "placeholder",
      "blurDataURL",
      "unoptimized",
      "onLoad",
      "onError",
    ].includes(prop),
});

/**
 * The card image.
 *
 * Two things were wrong here and both were expensive:
 *
 * 1. `as={motion.img}` replaced next/image's element, so the image pipeline
 *    never ran — full-size JPEGs straight from Firebase, no srcset, and
 *    `priority` silently discarded. Nothing on the image was ever animated,
 *    so dropping `as` costs nothing and restores optimisation.
 * 2. Without `width`/`height` the browser can't reserve a box, so every card
 *    was 0px tall until decode. `coverSize` is measured server-side; when it
 *    is missing we keep the previous un-sized markup rather than guess a
 *    ratio and shift the layout.
 *
 * The CSS box is identical either way: width comes from the chakra props and
 * `height: auto` keeps the intrinsic ratio, exactly as before.
 */
const CoverImage = ({
  src,
  alt,
  priority,
  sizes,
  coverSize,
}: {
  src: string;
  alt: string;
  priority: boolean;
  sizes: string;
  coverSize?: { width: number; height: number };
}) => {
  const shared = {
    w: { base: "100%", lg: "1028.57px" },
    maxW: "100%",
    h: "auto",
    sizes,
    position: "relative" as const,
    zIndex: 3,
  };

  if (!coverSize) {
    return (
      <chakra.img
        {...shared}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    );
  }

  return (
    <ChakraNextImage
      {...shared}
      src={src}
      alt={alt}
      htmlWidth={coverSize.width}
      htmlHeight={coverSize.height}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
    />
  );
};

export const PostItem = ({
  data: { variant, id, images, cro, eng, titleVariant, isVideo, coverSize },
  priority = false,
  ...rest
}: PostItemProps) => {
  const { locale } = useRouter();

  const title = locale === "en" ? eng.title : cro.title;

  const variantSafe = variant ?? "vertical";
  const [containerRef, videoRef] = useVideoAutoPlayback({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
  const thumbnailAlt = `${title} - Style Factory uniform ${isVideo ? "video" : "image"}`;
  const sizes =
    variantSafe === "vertical"
      ? "(min-width: 62em) 1029px, 100vw"
      : "(min-width: 20em) 1029px, 100vw";

  return (
    <MotionStack
      spacing={2}
      layoutId={id.toString()}
      alignItems={"start"}
      {...(variantSafe === "vertical" ? { pr: { base: 0, lg: 0 } } : {})}
      data-variant={variantSafe}
      ref={containerRef}
      {...rest}
    >
      <Box
        position="relative"
        w={{ base: "100%", lg: "1028.57px" }}
        maxW="100%"
        overflow="hidden"
      >
        {/* Shimmer skeleton sits BEHIND the image */}
        {!isVideo && (
          <div className="skeleton-shimmer" style={{ minHeight: "300px" }} />
        )}
        {isVideo ? (
          <chakra.video
            w={{ base: "100%", lg: "1028.57px" }}
            h={{ base: "auto", lg: "600px" }}
            src={images[0]}
            as={motion.video}
            objectFit="cover"
            muted
            loop
            preload="metadata"
            title={thumbnailAlt}
            aria-label={thumbnailAlt}
            ref={videoRef}
          />
        ) : (
          <CoverImage
            src={images[0]}
            alt={thumbnailAlt}
            priority={priority}
            sizes={sizes}
            coverSize={coverSize}
          />
        )}
      </Box>
    </MotionStack>
  );
};
