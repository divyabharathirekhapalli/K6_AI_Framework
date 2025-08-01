import { group } from "k6";
import { Options } from "k6/options";
import { exampleModule } from "./modules/exampleModule";

export let options: Options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  group("Example group", () => {
    exampleModule();
  });
}