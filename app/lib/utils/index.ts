export * from "./responseUtil";
export * from "./arrUtil";
export * from "./dateUtil";
export * from "./colorUtil";
export * from "./stringUtil";
export * from "./projectUtil";
export * from "../dbService/encryptPassword";

// Combine class names conditionally
export const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
}
