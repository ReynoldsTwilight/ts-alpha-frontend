import { styled } from "@stitches/react";
import { blackA } from "@radix-ui/colors";

const Input = styled("input", {
  variants: {
    margin: {
      xxl: { margin: 64 },
      url: { margin: "0 0 24px 0" },
      login: { margin: "0 0 12px 0" },
    },
    border: {
      dropdown: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }
    }
  },
  all: "unset",
  width: 150,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: "black",
  // backgroundColor: blackA.blackA5,
  boxShadow: `0 0 0 1px ${blackA.blackA9}`,
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

export { Input };
