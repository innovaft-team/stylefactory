import { chakra, StackProps, Text, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import { motion } from "framer-motion";
import { Blog } from "../hooks/useListBlogs";
import { useRouter } from "next/router";
import { useVideoAutoPlayback } from "@/hooks/useVideoAutoPlayback";

interface PostItemProps extends StackProps {
  data: Blog;
}

const MotionStack = motion(VStack);

export const PostItem = ({
  data: { variant, id, images, cro, eng, titleVariant, isVideo },
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

  if (variantSafe === "vertical") {
    return (
      <MotionStack
        spacing={2}
        layoutId={id.toString()}
        alignItems={"start"}
        pr={{ base: 0, lg: 0 }}
        data-variant={variantSafe}
        ref={containerRef}
        {...rest}
      >
        {isVideo ? (
          <chakra.video
            w={{ base: "100%", lg: "auto" }}
            h={{ base: "auto", lg: 600 }}
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
          <Image
            placeholder={"blur"}
            /**
             * Pinned on width rather than height so that trimming the white
             * band off the artwork makes the card shorter instead of wider.
             * These are the widths a 250px / 600px tall card rendered at when
             * the artwork still carried the band (height x its 12:7 ratio).
             */
            w={{ base: "100%", lg: "1028.57px" }}
            maxW={"100%"}
            h={"auto"}
            as={motion.img}
            src={images[0]}
            alt={thumbnailAlt}
            sizes="(min-width: 62em) 1029px, 100vw"
          />
        )}
      </MotionStack>
    );
  }

  return (
    <MotionStack
      spacing={2}
      alignItems={"start"}
      layoutId={id.toString()}
      pr={{ base: 0, lg: 5 }}
      data-variant={variantSafe}
      ref={containerRef}
      {...rest}
    >
      {isVideo ? (
        <chakra.video
          w={{ base: "100%", lg: 500 }}
          h={{ base: "auto", lg: 600 }}
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
        <Image
          placeholder={"blur"}
          w={{ base: "100%", lg: 700 }}
          h={"auto"}
          as={motion.img}
          src={images[0]}
          alt={thumbnailAlt}
          sizes="(min-width: 62em) 700px, 80vw"
          style={{ objectFit: "cover" }}
        />
      )}
    </MotionStack>
  );
};
