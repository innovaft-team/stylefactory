import { Box, Button, Img, Slide, useDisclosure } from "@chakra-ui/react";
import { ChakraLogoIcon, ChakraKebabIcon, ChakraLogoSmIcon } from "../atoms/icons";

import { MobileNavigationDrawer } from "./MobileNavigationDrawer";

export const MobileNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position={"fixed"}
      top={6}
      zIndex={"1000"}
      data-role={"navigation"}
      bg={"transparent"}
      justifyContent={"end"}
      pl={9}
      display="flex"
      w={"full"}
    >
      <Button
        background={"transparent"}
        display={isOpen ? "none" : "block"}
        boxSize={{ base: 10, md: 16 }}
      >
        <ChakraKebabIcon
          onClick={onOpen}
          display={isOpen ? "none" : "block"}
          float={"right"}
          color={"#7a7676"}
          boxSize={{ base: 10, md: 16 }}
          _hover={{ background: "transparent" }}
        />
      </Button>
      <Slide direction="right" in={isOpen} style={{ zIndex: 10000 }}>
        <MobileNavigationDrawer onClose={onClose} />
      </Slide>
    </Box>
  );
};
