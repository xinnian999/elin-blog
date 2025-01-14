import { Lang } from "@/interface";

interface Locale {
  label: string;
  value: Lang;
  data: Record<string, string>;
}

const locales: Locale[] = [
  {
    label: "中文",
    value: "zh",
    data: {
      "Nav Home": "首页",
      "Nav Friend": "朋友们",
      "Nav Friend Link": "友情链接",
      "Nav Friend Comment": "留言板",
      "Nav About": "关于",
      "Auther Say": "你好！我是Elin",
      "Home Comment Title": "最新留言",
    },
  },
  {
    label: "English",
    value: "en",
    data: {
      "Nav Home": "Home",
      "Nav Friend": "Friends",
      "Nav Friend Link": "Friend Links",
      "Nav Friend Comment": "Message Board",
      "Nav About": "About",
      "Auther Say": "Hello! I'm Elin",
      "Home Comment Title": "Latest Comments",
    },
  },
  {
    label: "日本語",
    value: "ja",
    data: {
      "Nav Home": "ホーム",
      "Nav Friend": "友達",
      "Nav Friend Link": "友達リンク",
      "Nav Friend Comment": "メッセージボード",
      "Nav About": "約",
      "Auther Say": "こんにちは！私はElinです",
      "Home Comment Title": "最新のコメント",
    },
  },
];

export default locales;
