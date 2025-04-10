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
    to: "/categories",
  },
  {
    label: t("Nav Tag"),
    to: "/tags",
  },
  {
    label: t("Nav Friend Link"),
    to: "/link",
  },
  {
    label: t("Nav Friend Comment"),
    to: "/comment",
  },
  // {
  //   label: "作品",
  //   to: "/works",
  // },
  {
    label: t("Nav About"),
    to: "/about",
  },
];
