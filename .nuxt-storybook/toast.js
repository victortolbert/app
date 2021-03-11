import { createToastInterface } from "vue-toastification";

export default function (ctx, inject) {
  const toast = createToastInterface({"cssFile":"\u002FUsers\u002Fvtolbert\u002F@victortolbert\u002F_github\u002F__app__\u002Fnode_modules\u002Fvue-toastification\u002Fdist\u002Findex.css","timeout":2000,"closeOnClick":false});
  inject('toast', toast);
}
