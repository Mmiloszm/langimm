/*this is reusable icon component created for using icons libraries in ssr components*/
"use client";
import {
  Basketball,
  BookOpenText,
  CircleNotch,
  EnvelopeSimple,
  Exam,
  Funnel,
  Gear,
  Icon,
  IconProps,
  List,
  SignOut,
  Warning,
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
  warning: Warning,
  loading: CircleNotch,
  topic: BookOpenText,
  settings: Gear,
  signout: SignOut,
  quiz: Exam,
  sort: Funnel,
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
