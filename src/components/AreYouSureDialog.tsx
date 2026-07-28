import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
} from "@chakra-ui/react";

interface AreYouSureDialogProps extends Omit<AlertDialogProps, "children"> {
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

export const AreYouSureDialog = ({
  onConfirm,
  onCancel,
  ...rest
}: AreYouSureDialogProps) => {
  return (
    <AlertDialog {...rest}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Jeste li sigurni?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Ova akcija je nepovratna</AlertDialogBody>
        <AlertDialogFooter gap={4}>
          <Button onClick={onCancel}>Odustani</Button>
          <Button colorScheme={"red"} onClick={onConfirm}>
            Obriši
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
