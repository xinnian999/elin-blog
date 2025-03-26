import { defineComponent } from "vue";

const VNode = defineComponent({
  props: ["content"],
  setup({ content }) {
    return () => <content />;
  },
});

export default VNode;
