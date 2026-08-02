import {
  Grid,
  Text,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  HStack,
  VStack,
  Stack,
} from "@chakra-ui/react";
import {
  ChakraEmailIcon,
  ChakraInfoIcon,
  ChakraInstagramIcon,
  ChakraLinkedInIcon,
  ChakraPinterestIcon,
  ChakraYoutubeIcon,
} from "../atoms/icons";

export const MobileContact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Grid gridTemplateColumns={"1.5rem"} rowGap={6} >
      <IconButton
        color={'rgb(128, 128, 128)'}
        transition="all 0.3s ease"
        _hover={{ color: "black", background: "transparent", transform: "scale(1.18)" }}
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
        display="inline-flex"
      >
        <ChakraInstagramIcon
          color={'rgb(128, 128, 128)'}
          transition="all 0.3s ease"
          _hover={{ color: "black", transform: "scale(1.18)" }}
        />
      </Link>
      <Link
        href={"https://www.pinterest.com/StyleFactoryUniforms/"}
        target="_blank"
        display="inline-flex"
      >
        <ChakraPinterestIcon
          color={'rgb(128, 128, 128)'}
          transition="all 0.3s ease"
          _hover={{ color: "black", transform: "scale(1.18)" }}
        />
      </Link>
      <Link
        href={
          "https://www.linkedin.com/company/style-factory-professional-uniforms/"
        }
        target="_blank"
        display="inline-flex"
      >
        <ChakraLinkedInIcon
          color={'rgb(128, 128, 128)'}
          transition="all 0.3s ease"
          _hover={{ color: "black", transform: "scale(1.18)" }}
        />
      </Link>

      <Modal isOpen={isOpen} onClose={onClose} isCentered  >
          <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
          <ModalContent
            maxW="56rem"
            m={'5%'}
            backgroundColor={'#fbfbf8'}>

            <ModalCloseButton />
            <ModalBody m={'auto'}>

              <Stack py={24} fontSize={'14px'} direction={{base: 'column', lg: 'row'}}>

                <VStack spacing={4} pr={{base: '0', lg: 10}}>

                  <Text>
                  info@stylefactory.hr
                  </Text>
                  <Text >00385 99 66 66 331</Text>
                  <Text>OFFICE</Text>
                  <Text  textAlign={'center'}>Style factory <br></br> Vrisnička 18 <br></br> 10000 Zagreb <br></br> Croatia</Text>
                
                </VStack >



                <Text pl={{base: '0', lg: 10}} textAlign={'center'}>Style factory d.o.o. <br></br> Palinovečka 37 <br></br> 10000 Zagreb <br></br> Croatia <br></br> OIB: 92109672035</Text>


              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
    </Grid>
  );
};
