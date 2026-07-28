import {
  Box,
  Button,
  chakra,
  CloseButton,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { Blog } from "@/hooks/useListBlogs";
import { useCreateBlog } from "@/hooks/useCreateBlog";
import { useState } from "react";
import { useCurrentUser } from "../../config";

export interface NewBlogFormFieldValues extends Blog {
  isHorizontal: boolean;
  titleIsHorizontal: boolean;
}

interface CreateBlogFormProps {
  path: string;
}

export const CreateBlogFormModal = ({ path }: CreateBlogFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState<Array<File | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewBlogFormFieldValues>();

  const { mutate, error, isPending } = useCreateBlog(path);

  const isHorizontal = useWatch({
    control,
    name: "isHorizontal",
  });

  const isTitleHorizontal = useWatch({
    control,
    name: "titleIsHorizontal",
  });

  const isVideo = useWatch({
    control,
    name: "isVideo",
  });

  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        position={"fixed"}
        zIndex={"1000"}
        bottom={"10"}
        right={"10"}
      >
        Nova objava
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmit((data) => {
            mutate(
              {
                ...data,
                imagesFiles: images.filter((image) => image !== null) as File[],
                variant: data.isHorizontal ? "horizonal" : "vertical",
                titleVariant: data.titleIsHorizontal ? "horizonal" : "vertical",
                path,
                postedAt: new Date().toDateString(),
              },
              {
                onSuccess: onClose,
              },
            );
          })}
        >
          <ModalHeader>Nova objava</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={VStack}>
            <Tabs>
              <TabList>
                <Tab>Hrvatski</Tab>
                <Tab>Engleski</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <FormControl>
                    <FormLabel>Naslov</FormLabel>
                    <Input
                      {...register("cro.title", {
                        required: "Naslov je obavezan",
                      })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Sadržaj</FormLabel>
                    <Controller
                      control={control}
                      name={"cro.content"}
                      rules={{
                        required: "Sadržaj je obavezan",
                      }}
                      render={({ field }) => (
                        <MdEditor
                          onChange={field.onChange}
                          modelValue={field.value}
                          language={"en-US"}
                        />
                      )}
                    />
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      {...register("eng.title", {
                        required: "Naslov je obavezan",
                      })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Controller
                      control={control}
                      name={"eng.content"}
                      rules={{
                        required: "Sadržaj je obavezan",
                      }}
                      render={({ field }) => (
                        <MdEditor
                          onChange={field.onChange}
                          modelValue={field.value}
                          language={"en-US"}
                        />
                      )}
                    />
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <FormControl>
              <FormLabel>Orijentacija naslova</FormLabel>
              <Switch {...register("titleIsHorizontal")}>
                {isTitleHorizontal ? "Horizontalno" : "Vertikalno"}
              </Switch>
            </FormControl>
            <FormControl>
              <FormLabel>Orijentacija prve slike</FormLabel>
              <Switch {...register("isHorizontal")}>
                {isHorizontal ? "Horizontalna" : "Vertikalna"}
              </Switch>
            </FormControl>
            <FormControl>
              <FormLabel>Sadržaj</FormLabel>
              <Switch {...register("isVideo")}>
                {isVideo ? "Videozapis" : "Slike"}
              </Switch>
            </FormControl>
            <FormControl>
              <FormLabel>{isVideo ? "Videozapis" : "Slike"}</FormLabel>
              <Grid gridTemplateColumns={"repeat(5, 1fr)"} gap={"2"}>
                {Array.from({
                  length: isVideo ? 1 : 5,
                }).map((_, index) => (
                  <Box position={"relative"} key={`img-${index}`}>
                    <CloseButton
                      position={"absolute"}
                      title={"ukloni"}
                      onClick={() => {
                        setImages((prevState) => {
                          const newState = [...prevState];
                          newState[index] = null;
                          return newState;
                        });
                      }}
                    />

                    <chakra.img
                      key={index}
                      w={"full"}
                      h={"auto"}
                      alt={`img-${index}`}
                      _hover={{
                        opacity: 0.5,
                      }}
                      src={
                        images[index]
                          ? // @ts-ignore
                            URL.createObjectURL(images[index])
                          : "https://via.placeholder.com/150"
                      }
                    />
                    <chakra.input
                      type={"file"}
                      onChange={(e) => {
                        console.log(e.target.files?.item(0));
                        if (e.target.files) {
                          const file = e.target.files?.item(0);

                          if (file) {
                            setImages((prevState) => {
                              // @ts-ignore
                              const newState = [...prevState];
                              newState[index] = file;
                              return newState;
                            });
                          }
                        }
                      }}
                    />
                  </Box>
                ))}
              </Grid>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type={"submit"} isLoading={isPending}>
              Spremi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
