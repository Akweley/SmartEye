import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui";

// import { ThreeDots } from "react-loader-spinner";

type ConfirmationBoxProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string | React.ReactNode;
  onSubmit: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  error?: string;
};
export function ConfirmationBox({
  open,
  title,
  setOpen,
  description,
  onCancel,
  onSubmit,
  children,
  isLoading,
  error,
}: ConfirmationBoxProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">{children}</div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              onSubmit();
              setOpen(false);
            }}
            disabled={isLoading}
          >
            Confirm
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              onCancel();
              setOpen(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="flex flex-col text-sm mb-5">
            {isLoading && (
              <div className="flex w-full justify-center">
                {/* <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#f620e5"
                  ariaLabel="three-dots-loading"
                  visible={true}
                /> */}
              </div>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
