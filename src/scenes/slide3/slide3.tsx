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

import { H2 } from "../../ui/typography";
import { GeneralTitle, LinedHeader } from "../../ui/util";
import { ChatWindow } from "./components/chat";

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const container = createRef<Rect>();
  const text = createRef<Txt>();
  const chat = createRef<ChatWindow>();

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
        <GeneralTitle slide={3} total={10} />
        <Rect
          ref={container}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <H2
            ref={text}
            text={`\
Lorem ipsum dolor sit amet, consectetur\nadipiscing elit, sed do eiusmod  tempor incididunt\nut labore et dolore magna aliqua. 

Ut enim ad minim  veniam, quis nostrud\nexercitation ullamco laboris nisi ut aliquip ex ea\ncommodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate\nvelit esse cillum dolore eu fugiat nulla pariatur. `}
            width={900}
          />
          <ChatWindow ref={chat} width={800} />
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
          text={"Знакомство с командой"}
        />
      </Rect>

      <Rect
        ref={transition.chat_overlay}
        fill={colors["overlay"]}
        width={800}
        height={592}
        x={520}
        y={18}
        radius={15}
      ></Rect>
    </Rect>,
  );

  text().opacity(0);
  transition.chat_overlay().opacity(0);

  yield* all(
    slideHeader.text.text("Проблематика", 1),
    chat().animate(),
    text().opacity(1, 1),
  );
  yield* beginSlide("Slide 4");

  yield* all(transition.chat_overlay().opacity(1, 0.5));
  chat().opacity(0);
  yield* all(
    transition.chat_overlay().size([500, 556], 1),
    transition.chat_overlay().x(800, 1),
    text().scale(0.5, 0.5),
    text().opacity(0, 0.5),
  );
  yield* waitTransition(0);
});
