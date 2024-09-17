import { Circle, Layout, LayoutProps, Rect } from "@motion-canvas/2d";
import { createRef, Reference } from "@motion-canvas/core";
import { colors } from "../config";
import { H1, H2 } from "./typography";

export interface WindowProps extends LayoutProps {
  instant?: boolean;
}

function WindowHeader() {
  return (
    <Rect
      padding={[10, 30]}
      fill={colors["overlay"]}
      width={"100%"}
      height={44}
      justifyContent={"end"}
      radius={[15, 15, 0, 0]}
      gap={10}
    >
      <Circle fill={"#05a400"} size={24} />
      <Circle fill={"#ffc300"} size={24} />
      <Circle fill={"#f64f59"} size={24} />
    </Rect>
  );
}

export class Window extends Layout {
  private readonly content: Reference<Rect>;

  constructor({ instant = false, children, ...props }: WindowProps) {
    super({ width: "100%", direction: "column", ...props });
    this.content = createRef<Rect>();

    this.add(
      <>
        <WindowHeader />
        <Rect
          ref={this.content}
          fill={colors["surface"]}
          radius={[0, 0, 15, 15]}
          clip
          height={instant ? null : 0}
        >
          {children}
        </Rect>
      </>,
    );
  }

  public *animate() {
    yield* this.content().height(null, 1);
  }
}

export function Card({ title, content }: { title: string; content: string }) {
  return (
    <Rect
      layout
      padding={40}
      direction={"column"}
      fill={colors["overlay"]}
      radius={15}
      gap={20}
    >
      <H1 text={title} fontWeight={700} />
      <H2 text={content} />
    </Rect>
  );
}
