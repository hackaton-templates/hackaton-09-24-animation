import { Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  createRef,
  createRefArray,
  createRefMap,
  makeRef,
  waitTransition,
} from "@motion-canvas/core";
import { colors } from "../../config";

import { GeneralTitle, LinedHeader } from "../../ui/util";
import { ChatWindow } from "./components/chat";

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const container = createRef<Rect>();
  const chat = createRef<ChatWindow>();
  const items = createRefArray<Layout>();

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
        <GeneralTitle slide={6} total={10} />
        <Rect ref={container} width={"100%"} alignItems={"center"}>
          <ChatWindow ref={chat} />
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
        <LinedHeader
          ref={makeRef(slideHeader, "text")}
          text={"Система моделей"}
        />
      </Rect>
    </Rect>,
  );

  yield* all(
    slideHeader.text.text("Расширение базы знаний", 1),
    chat().animate(),
  );

  yield* beginSlide("Slide 7");

  yield* all(chat().scale(0.5, 1), chat().opacity(0, 1));
  yield* waitTransition(0);
});
