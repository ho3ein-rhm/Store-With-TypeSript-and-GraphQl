import { queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    t.field("hossein", {
      type: "String",
      resolve: () => "salam",
    });
  },
});
