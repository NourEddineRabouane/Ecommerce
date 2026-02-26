import { showToast } from "nextjs-toast-notify";
import { ReactNode } from "react";

type types = "success" | "warning" | "error";
type positions =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
type animations = "bounceIn" | "slideInUp" | "fadeIn" | "topBounce";

interface toastProps {
  message: string;
  type: types;
  duration: number;
  position: positions;
  icon: any | undefined;
  animation: animations;
}

export default function Toast(props: toastProps) {
  switch (props.type) {
    case "success":
      showToast.success(props.message, {
        duration: props.duration,
        position: props.position,
        icon: props.icon,
        transition: props.animation,
      });
      break;
    case "warning":
      showToast.warning(props.message, {
        duration: props.duration,
        position: props.position,
        icon: props.icon,
        transition: props.animation,
      });
      break;
    case "error":
      showToast.error(props.message, {
        duration: props.duration,
        position: props.position,
        icon: props.icon,
        transition: props.animation,
      });
      break;
  }

  return <></>;
}
