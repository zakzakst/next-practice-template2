import yaml from "js-yaml";
import merge from "lodash.merge";
import fs from "node:fs";

const loadYaml = (filePath: string) => {
  const content = fs.readFileSync(filePath, "utf8");
  return yaml.load(content);
};

const auth = loadYaml("openapi/auth.yaml");
const profile = loadYaml("openapi/profile.yaml");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const merged: any = merge({}, auth, profile);
merged.info = merged.info || {};
merged.info.title = "My App API";

fs.writeFileSync("openapi/_bundle.yaml", yaml.dump(merged), "utf8");
console.log("_bundle.yamlを生成しました");
