import { Txt, TxtProps } from "@motion-canvas/2d";
import { colors, sizes } from "../config";

export function H1(props: TxtProps) {
  return <Txt fill={colors["text_white"]} fontSize={sizes["2xl"]} {...props} />;
}

export function H2(props: TxtProps) {
  return (
    <Txt fill={colors["text_overlay"]} fontSize={sizes["xl"]} {...props} />
  );
}

export function H3(props: TxtProps) {
  return (
    <Txt fill={colors["text_overlay"]} fontSize={sizes["lg"]} {...props} />
  );
}

export function Paragraph(props: TxtProps) {
  return (
    <Txt fill={colors["text_surface"]} fontSize={sizes["md"]} {...props} />
  );
}
