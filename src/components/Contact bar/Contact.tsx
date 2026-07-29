import {
  Button,
  Grid,
  Hide,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  IconButton,
  background,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  ChakraEmailIcon,
  ChakraInfoIcon,
  ChakraInstagramIcon,
  ChakraLinkedInIcon,
  ChakraPinterestIcon,
  ChakraYoutubeIcon,
} from "../atoms/icons";
import { color } from "framer-motion";

export const Contact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Hide below="768px">
      <Grid
        gridTemplateColumns={"1.5rem"}
        rowGap={6}
      >
        <IconButton
          color={'rgb(128, 128, 128)'}
          _hover={{ background: "transparent" }}
          minW={"fit-content"}
          onClick={onOpen}
          icon={<ChakraInfoIcon height={{ base: "6" }} />}
          aria-label={"contact"}
          p={0}
          m={0}
          background={"transparent"}
        />
        <Link
          href={"https://www.instagram.com/stylefactory.uniforms/"}
          target="_blank"
        >
          <ChakraInstagramIcon color={'rgb(128, 128, 128)'}/>
        </Link>
        <Link href={"https://www.pinterest.com/StyleFactoryUniforms/"} target="_blank">
          <ChakraPinterestIcon color={'rgb(128, 128, 128)'}/>
        </Link>
        <Link
          href={
            "https://www.linkedin.com/company/style-factory-professional-uniforms/"
          }
          target="_blank"
        >
          <ChakraLinkedInIcon color={'rgb(128, 128, 128)'}/>
        </Link>

        <Modal isOpen={isOpen} onClose={onClose} isCentered  >
          <ModalOverlay />
          <ModalContent
            maxW="56rem"
            backgroundColor={'rgba(255,255,255, 0.7)'
            }>

            <ModalCloseButton />
            <ModalBody m={'auto'}>

              <HStack py={24}>

                <VStack spacing={4} pr={20}>

                  <Text>
                  info@stylefactory.hr
                  </Text>
                  <Text>+385 99 66 66 33 1</Text>
                  <Text>OFFICE</Text>
                  <Text  textAlign={'center'}>Style factory <br></br> Vrisnička 18 <br></br> 10000 Zagreb <br></br> Croatia</Text>
                
                </VStack >



                <Text pl={10} textAlign={'center'}>Style factory d.o.o. <br></br> Palinovečka 37 <br></br> 10000 Zagreb <br></br> Croatia <br></br> OIB: 92109672035</Text>


              </HStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Grid>
    </Hide>
  );
};
