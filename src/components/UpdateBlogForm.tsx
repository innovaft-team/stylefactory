import {
  Box,
  Button,
  chakra,
  CloseButton,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
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
import mime from "mime-types";

import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { Blog } from "@/hooks/blog";
import { useUpdateBlog } from "@/hooks/useCreateBlog";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../config";
import { useQuery } from "@tanstack/react-query";

export interface NewBlogFormFieldValues extends Blog {
  isHorizontal: boolean;
  titleIsHorizontal: boolean;
}

interface CreateBlogFormProps {
  path: string;
  blog: Blog;
}

function getFileNameAndExtension(url: string) {
  // Extract the filename from the URL
  let filename = url.substring(
    url.lastIndexOf("/") + 1,
    url.indexOf("?") !== -1 ? url.indexOf("?") : url.length,
  );

  // Extract the file extension
  let fileExt = filename.substring(filename.lastIndexOf(".") + 1);

  return { filename: filename, extension: fileExt };
}

const usePreviewEditableFiles = (files: string[]) => {
  return useQuery({
    queryKey: ["preview-editable-files", files],
    queryFn: async () => {
      let responses = await Promise.all(files.map((file) => fetch(file)));

      return await Promise.all(
        responses.map(async (response, index) => {
          let data = await response.blob();
          const info = getFileNameAndExtension(files[index]);

          const mimeType = mime.contentType(info.extension);

          let metadata = {
            type: mimeType || "image/jpg",
          };

          return new File([data], info.filename, metadata);
        }),
      );
    },
  });
};

export const UpdateBlogForm = ({ path, blog }: CreateBlogFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [images, setImages] = useState<Array<File | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const previewFiles = usePreviewEditableFiles(blog.images);

  if (images.every((val) => val === null) && previewFiles.data != null) {
    setImages((old) => {
      return old.map((_, index) => {
        if (previewFiles.data) {
          return previewFiles.data[index];
        }

        return null;
      });
    });
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewBlogFormFieldValues>({
    defaultValues: {
      ...blog,
      isHorizontal: blog.variant === "horizonal",
      titleIsHorizontal: blog.titleVariant === "horizonal",
    },
  });

  const { mutate, error, isPending } = useUpdateBlog(path);

  const isHorizontal = useWatch({
    control,
    name: "isHorizontal",
  });

  const isTitleHorizontal = useWatch({
    control,
    name: "titleIsHorizontal",
  });

  const currentUser = useCurrentUser();

  const isVideo = useWatch({
    control,
    name: "isVideo",
  });

  useEffect(() => {
    if (!isOpen) {
      setImages([null, null, null, null, null]);
    }
  }, [isOpen]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Uredi</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmit((data) => {
            mutate(
              {
                ...data,
                imagesFiles: images.filter(
                  (image) => image !== null && image !== undefined,
                ) as File[],
                variant: data.isHorizontal ? "horizonal" : "vertical",
                titleVariant: data.titleIsHorizontal ? "horizonal" : "vertical",
                path,
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
