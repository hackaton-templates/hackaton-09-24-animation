import { Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  createRef,
  createRefMap,
  easeOutElastic,
  makeRef,
  waitTransition,
} from "@motion-canvas/core";
import { colors, gradient, sizes } from "../../config";

import { Card } from "../../ui/card";
import { H1 } from "../../ui/typography";
import { GeneralTitle, LinedHeader } from "../../ui/util";

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const container = createRef<Rect>();

  const transition = createRefMap<Layout>();

  const slideHeader = {
    container: null as Rect,
    text: null as Txt,
  };

  view.add(
    <Rect ref={surface} width={1920} height={1080} fill={colors["base"]}>
      <Rect
        width={"100%"}
        height={"100%"}
        padding={[30, 40]}
        gap={30}
        layout
        direction={"column"}
        justifyContent={"space-between"}
      >
        <GeneralTitle slide={4} total={10} />
        <Rect
          ref={container}
          width={890}
          height={556}
          justifyContent={"space-between"}
          direction={"column"}
          clip
        >
          <Card
            title="Lorem Ipsum"
            content={
              "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit, sed do eiusmod tempor"
            }
          />
          <Card
            title="Lorem Ipsum"
            content={
              "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit, sed do eiusmod tempor"
            }
          />
        </Rect>
        <Layout />
      </Rect>

      <Rect
        ref={makeRef(slideHeader, "container")}
        layout
        y={491}
        width={"100%"}
        padding={40}
      >
        <LinedHeader ref={makeRef(slideHeader, "text")} text={"Проблематика"} />
      </Rect>

      <Rect
        ref={transition.rate}
        fill={gradient}
        width={500}
        height={556}
        x={260}
        y={18}
        radius={15}
        layout
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <H1 text={"100%"} fontSize={sizes["ul"]} fontWeight={700} />
        <H1 text={"Точность прогноза"} />
      </Rect>
      <Rect
        ref={transition.rect}
        fill={colors["overlay"]}
        width={500}
        height={556}
        x={800}
        y={18}
        radius={15}
      ></Rect>

      <Rect
        ref={transition.overlay}
        fill={colors["base"]}
        width={1920}
        height={800}
        x={0}
        y={18}
      ></Rect>
    </Rect>,
  );

  transition.rate().scale(0.7);
  transition.rate().opacity(0);
  transition.overlay().scale([0, 1]);
  container().scale(0);
  container().size([0, 556]);

  yield* all(
    slideHeader.text.text("Концепция", 1),
    transition.rate().scale(1, 1, easeOutElastic),
    transition.rate().opacity(1, 1),
    container().scale(1, 1),
    container().size([890, 556], 1),
  );
  yield* beginSlide("Slide 5");

  yield* transition.overlay().scale([1, 1], 1);
  yield* waitTransition(0);
});
