import { Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  any,
  beginSlide,
  createRef,
  createRefArray,
  makeRef,
  waitTransition,
} from "@motion-canvas/core";
import { colors } from "../../config";

import { GeneralTitle, LinedHeader } from "../../ui/util";
import TeamCard, { TeamCardProps } from "./components/team";

const teamMembers: TeamCardProps[] = [
  {
    name: "Максим\nСлипенко",
  },
  {
    name: "Константин\nШмураков",
  },
  {
    name: "Никита\nРязанов",
    scale: 1.3,
  },
  {
    name: "Денис\nПервий",
  },
  {
    name: "Дмитрий\nЕвтеев",
  },
];

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const container = createRef<Rect>();

  const slideHeader = {
    container: null as Rect,
    text: null as Txt,
  };
  const team = createRefArray<TeamCard>();

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
        <GeneralTitle slide={2} total={10} />
        <Rect ref={container} width={"100%"} justifyContent={"space-between"}>
          {teamMembers.map((props) => (
            <TeamCard ref={team} {...props} />
          ))}
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
        <LinedHeader ref={makeRef(slideHeader, "text")} />
      </Rect>
    </Rect>,
  );

  yield* all(
    slideHeader.text.text("Знакомство с командой", 1),
    ...team.map((card) => card.animate()),
  );
  yield* beginSlide("Slide 3");

  yield* any(container().scale(0, 1), container().opacity(0, 0.5));
  yield* waitTransition(0);
});
