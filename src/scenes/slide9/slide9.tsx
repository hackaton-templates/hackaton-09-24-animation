import {
  Circle,
  Img,
  Layout,
  makeScene2D,
  Rect,
  RectProps,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  createRef,
  createRefArray,
  createRefMap,
  makeRef,
  waitTransition,
} from "@motion-canvas/core";
import { colors, gradient, primaryFadeGradient, sizes } from "../../config";
import { GeneralTitle, LinedHeader } from "../../ui/util";

import waves from "../../assets/waves.png";
import { TeamLogo } from "../../ui/brand";
import { H1, Paragraph } from "../../ui/typography";

interface RoadmapEntry extends RectProps {
  title: string;
  text: string;
}

function RoadmapEntry({ title, text, ...props }: RoadmapEntry) {
  return (
    <Rect {...props} offset={[0, 1]} gap={20}>
      <Layout
        width={16}
        height={320}
        direction={"column"}
        alignItems={"center"}
      >
        <Circle fill={colors["text_surface"]} size={16} position={[32, 32]} />
        <Rect fill={primaryFadeGradient} grow={1} width={4} />
        <Circle fill={colors["text_white"]} size={8} position={[32, 32]} />
      </Layout>
      <Layout direction={"column"} gap={10}>
        <Paragraph text={title} fill={colors["text_white"]} fontWeight={700} />
        <Paragraph text={text} />
      </Layout>
    </Rect>
  );
}

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const container = createRef<Rect>();
  const entries = createRefArray<Rect>();

  const transition = createRefMap<Rect>();

  const slideHeader = {
    container: null as Rect,
    text: null as Txt,
  };
  const card = {
    base: null as Rect,
    summary: null as Txt,
    title: null as Txt,
    date: null as Txt,
    team: null as Layout,
    brand: null as Img,
  };

  view.add(
    <Rect ref={surface} width={1920} height={1080} fill={colors["base"]}>
      <Rect ref={transition.base} width={1920} height={1080} fill={gradient} />
      <Img ref={transition.waves} src={waves} width={1920} height={540} />
      <Rect
        ref={transition.years}
        y={320}
        width={1920}
        layout
        justifyContent={"center"}
        gap={30}
      >
        <Paragraph text={"2024"} />
        <Paragraph text={"2025"} fill={colors["text_base"]} />
        <Paragraph text={"2026"} fill={colors["text_base"]} />
      </Rect>

      <Rect
        ref={transition.content}
        width={"100%"}
        height={"100%"}
        padding={[30, 40]}
        gap={30}
        layout
        direction={"column"}
        justifyContent={"space-between"}
      >
        <GeneralTitle slide={9} total={10} />
        <Rect
          ref={container}
          width={"100%"}
          justifyContent={"space-around"}
          gap={20}
        >
          <RoadmapEntry
            ref={entries}
            title="Q4 2024"
            text={
              "Lorem ipsum dolor sit\namet, consectetur\nadipiscing elit, sed do\neiusmod tempor"
            }
          />
          <RoadmapEntry
            ref={entries}
            title="Q1 2025"
            text={
              "Lorem ipsum dolor sit\namet, consectetur\nadipiscing elit, sed do\neiusmod tempor"
            }
          />
          <RoadmapEntry
            ref={entries}
            title="Q2 2025"
            text={
              "Lorem ipsum dolor sit\namet, consectetur\nadipiscing elit, sed do\neiusmod tempor"
            }
          />
        </Rect>
        <Layout />
      </Rect>

      <Rect
        ref={makeRef(card, "base")}
        fill={colors["base"]}
        radius={15}
        minWidth={900}
        padding={[30, 40]}
        layout
        gap={30}
        direction={"column"}
        justifyContent={"space-between"}
        clip
      >
        <Layout justifyContent={"space-between"} width={"100%"}>
          <Paragraph
            text="Цифровой прорыв 2024 Сезон: ИИ"
            ref={makeRef(card, "summary")}
          />
          <Paragraph text="29.09.2024" ref={makeRef(card, "date")} />
        </Layout>
        <H1
          ref={makeRef(card, "title")}
          text={"Интеллектуальный помощник\nоператора службы поддержки"}
        />
        <Layout
          paddingTop={30}
          alignItems={"center"}
          gap={15}
          ref={makeRef(card, "team")}
        >
          <TeamLogo />
          <Paragraph
            text="mzhn-team"
            fill={colors["text_overlay"]}
            fontStyle={"italic"}
            fontSize={sizes["lg"]}
          />
        </Layout>
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
          text={"Почему именно мы?"}
        />
      </Rect>

      <Rect
        ref={transition.overlay}
        fill={colors["base"]}
        width={1920}
        height={800}
        x={0}
        y={18}
      ></Rect>
      <Rect
        ref={transition.overlay2}
        stroke={gradient}
        lineWidth={0}
        width={1920}
        height={1080}
        x={0}
        y={0}
      ></Rect>
    </Rect>,
  );

  entries.forEach((e) => {
    e.padding([0, 0, 150, 0]);
    e.opacity(0);
  });
  transition.base().opacity(0);
  transition.waves().x(-500);
  transition.overlay2().lineWidth(0);
  card.base.opacity(0);
  card.base.size([1320, 480]);

  yield* all(
    slideHeader.text.text("Дорожная карта", 1),
    transition.overlay().left([1920, 0], 1),
    transition.waves().x(0, 0.7),
  );
  yield* all(...entries.map((e) => all(e.padding(0, 0.5), e.opacity(1, 0.5))));

  yield* beginSlide("Slide 9");

  yield* all(
    transition.overlay2().lineWidth(600, 1),
    transition.content().opacity(0, 1),
    transition.waves().opacity(0, 1),
    transition.years().opacity(0, 1),
  );

  card.base.opacity(1);
  transition.base().opacity(1);

  card.title.opacity(0);
  card.team.opacity(0);
  card.date.opacity(0);
  card.summary.opacity(0);

  yield* all(
    card.base.size([null, null], 1),
    card.title.opacity(1, 1),
    card.team.opacity(1, 1),
    card.date.opacity(1, 1),
    card.summary.opacity(1, 1),
  );
  yield* waitTransition(0);
});
