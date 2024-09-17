import { Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  createRef,
  createRefMap,
  makeRef,
  waitTransition,
} from "@motion-canvas/core";
import { colors } from "../../config";

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
        <GeneralTitle slide={7} total={10} />
        <Rect ref={container} width={"100%"} alignItems={"center"}></Rect>
        <Layout />
      </Rect>

      <Rect
        ref={makeRef(slideHeader, "container")}
        layout
        y={491}
        width={"100%"}
        padding={40}
      >
        <LinedHeader
          ref={makeRef(slideHeader, "text")}
          text={"Расширение базы знаний"}
        />
      </Rect>
    </Rect>,
  );

  yield* all(slideHeader.text.text("Инструментарий", 1));

  yield* beginSlide("Slide 8");

  yield* waitTransition(0);
});
