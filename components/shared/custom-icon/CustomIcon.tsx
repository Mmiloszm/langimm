/*this is reusable icon component created for using icons libraries in ssr components*/
"use client";
import {
  Basketball,
  EnvelopeSimple,
  Icon,
  IconProps,
  List,
  X,
} from "@phosphor-icons/react";

interface CustomIconProps extends IconProps {
  name: string;
}

type ListOfIconsProps = {
  [key: string]: Icon;
};
const IconsList: ListOfIconsProps = {
  email: EnvelopeSimple,
  menu: List,
  basketball: Basketball,
  close: X,
};

const CustomIcon = ({
  name,
  alt,
  color,
  size,
  weight,
  mirrored,
}: CustomIconProps) => {
  const NewIcon = IconsList[name];
  return (
    <NewIcon
      alt={alt}
      color={color}
      size={size}
      weight={weight}
      mirrored={mirrored}
    />
  );
};

export default CustomIcon;
