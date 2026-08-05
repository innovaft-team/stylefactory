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
          <Image
            placeholder={"blur"}
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
      data-variant={variantSafe}
      ref={containerRef}
      {...rest}
    >
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
        <Image
          placeholder={"blur"}
          w={{ base: "100%", lg: "1028.57px" }}
          maxW={"100%"}
          h={"auto"}
          as={motion.img}
          src={images[0]}
          alt={thumbnailAlt}
          sizes="(min-width: 20em) 1029px, 100vw"
        />
      )}
    </MotionStack>
  );
};
