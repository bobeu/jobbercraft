import { Modal } from "@mui/material";

export function LoadingModal(props: import("@mui/material").ModalProps) {
  const { children, ...rest } = props;
  return (
    <Modal className="flex items-center justify-center" {...rest}>
      { children }
    </Modal>
  );
}

export default LoadingModal;
