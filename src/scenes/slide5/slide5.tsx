import { Layout, LayoutProps, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  any,
  beginSlide,
  createRef,
  createRefArray,
  createRefMap,
  makeRef,
  waitTransition,
} from "@motion-canvas/core";
import { colors, sizes } from "../../config";

import { H1, H2, H3 } from "../../ui/typography";
import { GeneralTitle, LinedHeader } from "../../ui/util";

interface SchemeItemProps extends LayoutProps {
  title: string;
  number: string;
}

function SchemeItem({ title, number, ...props }: SchemeItemProps) {
  return (
    <Layout direction={"column"} gap={20} grow={1} padding={20} {...props}>
      <H1
        text={number}
        fontSize={sizes["3xl"]}
        fontWeight={700}
        fill={colors["primary"]}
      />
      <Rect width={"100%"} height={4} fill={colors["primary"]} />
      <H2 text={title} />
    </Layout>
  );
}

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const container = createRef<Rect>();
  const items = createRefArray<Layout>();

  const transition = createRefMap<Rect>();

  const slideHeader = {
    container: null as Rect,
    text: null as Txt,
  };

  view.add(
    <Rect ref={surface} width={1920} height={1080} fill={colors["base"]}>
      <Rect
        ref={transition.frame}
        position={[0, -125]}
        size={[803, 478]}
        stroke={colors["primary"]}
        lineWidth={4}
      ></Rect>
      <Rect
        ref={transition.frame_bg}
        position={[0, -129]}
        size={[750, 490]}
        fill={colors["base"]}
      ></Rect>

      <Rect
        width={"100%"}
        height={"100%"}
        padding={[30, 40]}
        gap={30}
        layout
        direction={"column"}
        justifyContent={"space-between"}
      >
        <GeneralTitle slide={5} total={10} />
        <Rect ref={container} width={"100%"} alignItems={"center"}>
          <SchemeItem ref={items} title="Lorem Ipsum" number="01" />
          <Rect direction={"column"} gap={20} grow={2} padding={20}>
            <SchemeItem ref={items} title="Lorem Ipsum" number="02" />
            <SchemeItem ref={items} title="Lorem Ipsum" number="03" />
          </Rect>
          <SchemeItem ref={items} title="Lorem Ipsum" number="04" />
        </Rect>
        <Layout ref={transition.text}>
          <H3
            text={`1. Lorem ipsum dolor sit\namet, consectetur\nadipiscing elit, sed do\neiusmod tempor`}
            grow={1}
          />
          <H3
            text={`2. Lorem ipsum dolor sit\namet, consectetur\nadipiscing elit, sed do\neiusmod tempor`}
            grow={1}
          />
          <H3
            text={`3. Lorem ipsum dolor sit\namet, consectetur\nadipiscing elit, sed do\neiusmod tempor`}
            grow={1}
          />
          <H3
            text={`4. Lorem ipsum dolor sit\namet, consectetur\nadipiscing elit, sed do\neiusmod tempor`}
            grow={1}
          />
        </Layout>
        <Layout />
      </Rect>

      <Rect
        ref={makeRef(slideHeader, "container")}
        layout
        y={491}
        width={"100%"}
        padding={40}
      >
        <LinedHeader ref={makeRef(slideHeader, "text")} text={"Концепция"} />
      </Rect>
    </Rect>,
  );

  transition.frame().scale([0, 1]);
  transition.frame_bg().scale([0, 1]);
  transition.text().padding([150, 0, 0, 0]);
  transition.text().opacity(0);
  items.forEach((i) => i.opacity(0));

  yield* any(
    slideHeader.text.text("Система моделей", 1),
    transition.frame().scale(1, 0.5),
    transition.frame_bg().scale(1, 0.5),
  );
  yield* all(
    ...items.map((i) => i.opacity(1, 0.5)),
    transition.text().padding(0, 1),
    transition.text().opacity(1, 0.5),
  );

  yield* beginSlide("Slide 6");

  yield* all(
    ...items.map((i) => i.opacity(0, 0.5)),
    transition.text().opacity(0, 0.5),
  );
  yield* all(
    transition.frame().size([1930, 1090], 0.5),
    transition.frame().position([0, 0], 0.5),
    transition.frame_bg().size([1920, 1100], 0.5),
    transition.frame_bg().position([0, 0], 0.5),
  );
  yield* waitTransition(0);
});
