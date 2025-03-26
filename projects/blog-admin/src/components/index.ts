import FormModal from "./FormModal.vue";
import TablePlus from "./TablePlus.vue";
import VNode from "./VNode";
import IconTag from "./IconTag.vue";
import FilterInput from "./FilterInput.vue";
import SvgIcon from "./SvgIcon.vue";

// 将本地svg图标全部导入
// const request = require.context("../assets/icons", false, /\.svg$/);
// request.keys().forEach(request);

export default (app) => {
  app.component("SvgIcon", SvgIcon);
  app.component("FormModal", FormModal);
  app.component("TablePlus", TablePlus);
  app.component("VNode", VNode);
  app.component("IconTag", IconTag);
  app.component("FilterInput", FilterInput);
};
