export type LinkType = {
  title: string;
  href: string;
  subLinks?: LinkType[];
  icon: JSX.Element;
};
