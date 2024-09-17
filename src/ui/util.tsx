import { Layout, Rect, TxtProps } from "@motion-canvas/2d";
import { gradient } from "../config";
import { H1, Paragraph } from "./typography";

export function LinedHeader(props: TxtProps) {
  return (
    <Layout
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={40}
    >
      <Rect fill={gradient} grow={1} height={4} />
      <H1 {...props} />
      <Rect fill={gradient} grow={1} height={4} />
    </Layout>
  );
}

export function GeneralTitle({
  slide,
  total,
}: {
  slide: number;
  total: number;
}) {
  const slideStr = String(slide).padStart(2, "0");
  return (
    <Layout
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Paragraph text="Интеллектуальный помощник оператора службы поддержки" />
      <Paragraph text={`${slideStr}/${total}`} />
    </Layout>
  );
}
