interface MenuItem {
  label: string;
  to?: string;
  children?: MenuItem[];
}

export default (t: (key: string) => string): MenuItem[] => [
  {
    label: t("Nav Home"),
    to: "/",
  },
  {
    label: t("Nav Category"),
    to: "/category",
  },
  {
    label: t("Nav Tag"),
    to: "/tag",
  },
  {
    label: t("Nav Friend Link"),
    to: "/link",
  },
  {
    label: t("Nav Friend Comment"),
    to: "/comment",
  },
  {
    label: t("Nav About"),
    to: "/about",
  },
];
