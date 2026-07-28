import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { AreYouSureDialog } from "@/components/AreYouSureDialog";
import React from "react";
import { useDeleteBlog } from "@/hooks/useCreateBlog";
import { Blog } from "@/hooks/useListBlogs";
import { useCurrentUser } from "../../config";
import { UpdateBlogForm } from "@/components/UpdateBlogForm";

interface DialogMenuProps {
  blog: Blog;
  onDelete: () => void;
  path: string;
}

export const DialogMenu = ({ blog, onDelete, path }: DialogMenuProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const ref = React.useRef();

  const { mutate } = useDeleteBlog();

  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Menu>
        <MenuButton
          ref={ref}
          position={"fixed"}
          zIndex={"9999"}
          top={5}
          right={20}
          as={Button}
        >
          Akcije
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Obriši</MenuItem>
          <UpdateBlogForm path={path} blog={blog} />
        </MenuList>
      </Menu>
      <AreYouSureDialog
        onConfirm={() => {
          mutate({
            ...blog,
            path,
          });
          onClose();
          onDelete();
          //  @ts-ignore
        }}
        leastDestructiveRef={ref}
        onCancel={onClose}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
