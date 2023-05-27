/*this is reusable icon component created for using icons libraries in ssr components*/
"use client";
import {
  AirplaneTilt,
  Baby,
  Bank,
  Basketball,
  BookOpenText,
  Calculator,
  Campfire,
  CaretLeft,
  CaretRight,
  CircleNotch,
  EnvelopeSimple,
  Exam,
  Funnel,
  FunnelSimple,
  Gear,
  GenderFemale,
  Globe,
  Hamburger,
  HandsPraying,
  Icon,
  IconProps,
  Leaf,
  List,
  NewspaperClipping,
  Person,
  PersonSimpleRun,
  PhoneCall,
  Question,
  SignOut,
  Student,
  UserCircle,
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
  filter: Funnel,
  lifestyle: PersonSimpleRun,
  politics: Bank,
  entertainment: Campfire,
  worldnews: NewspaperClipping,
  travelculture: AirplaneTilt,
  parenting: Baby,
  minoritiesvoices: Person,
  general: Globe,
  religion: HandsPraying,
  fooddrink: Hamburger,
  business: PhoneCall,
  sports: Basketball,
  sciencetechnology: Calculator,
  environment: Leaf,
  women: GenderFemale,
  education: Student,
  unknown: Question,
  sort: FunnelSimple,
  user: UserCircle,
  arrowforward: CaretRight,
  arrowback: CaretLeft,
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

