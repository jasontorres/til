import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "TIL",
    token: process.env.DATO_CMS_TOKEN,
  },
});

export default app;
