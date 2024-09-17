import { Layout, LayoutProps, Rect, Txt } from "@motion-canvas/2d";
import { all, makeRef, Vector2 } from "@motion-canvas/core";
import { colors, sizes } from "../../../config";
import { H1 } from "../../../ui/typography";

export interface TeamCardProps extends LayoutProps {
  name: string;
  instant?: boolean;
}

export default class TeamCard extends Layout {
  public readonly photo: Rect;
  public readonly title: Txt;

  private readonly _scale: Vector2;
  private readonly _opacity: number;

  constructor({ name, instant = false, ...props }: TeamCardProps) {
    super({
      direction: "column",
      alignItems: "center",
      gap: 25,
      ...props,
      children: null,
    });

    this.add(
      <>
        <Rect
          ref={makeRef(this, "photo")}
          width={240}
          ratio={1}
          fill={colors["surface"]}
          radius={15}
        />
        <H1
          ref={makeRef(this, "title")}
          text={name}
          textAlign={"center"}
          fontSize={sizes["lg"]}
        />
      </>,
    );

    if (!instant) {
      this._scale = this.scale();
      this._opacity = this.opacity();

      this.scale(0);
      this.opacity(0);
    }
  }

  public *animate() {
    yield* all(this.scale(this._scale, 1), this.opacity(this._opacity, 1));
  }
}
