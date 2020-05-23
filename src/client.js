import * as sapper from "@sapper/app";

sapper.start({
  target: document.querySelector("#sapper"),
  props: {
    name: process.env.SITE_NAME,
    token: process.env.DATO_CMS_TOKEN,
  },
});
