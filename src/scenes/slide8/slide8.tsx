import {
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
import { colors } from "../../config";
import { GeneralTitle, LinedHeader } from "../../ui/util";

import question from "../../assets/question.png";
import star from "../../assets/star.png";
import weight from "../../assets/weight.png";
import { H2, H3 } from "../../ui/typography";

interface WhyCardProps extends RectProps {
  color: string;
  icon: string;
  title: string;
  text: string;
}

function WhyCard({ color, icon, title, text, ...props }: WhyCardProps) {
  return (
    <Rect fill={color} paddingTop={40} grow={1} radius={15} clip {...props}>
      <Rect
        fill={colors["surface"]}
        width={"100%"}
        padding={20}
        layout
        direction={"column"}
        gap={40}
      >
        <Layout alignItems={"center"} gap={20}>
          <Rect
            layout
            justifyContent={"center"}
            alignItems={"center"}
            size={80}
            fill={colors["overlay"]}
            radius={15}
          >
            <Img src={icon} />
          </Rect>
          <H2 text={title} />
        </Layout>
        <H3 text={text} />
      </Rect>
    </Rect>
  );
}

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const container = createRef<Rect>();
  const cards = createRefArray<Rect>();

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
        <GeneralTitle slide={8} total={10} />
        <Rect ref={container} width={"100%"} alignItems={"center"} gap={20}>
          <WhyCard
            ref={cards}
            color={colors["primary"]}
            icon={star}
            title="Функционал"
            text={
              "Lorem ipsum dolor sit amet:\n\n* Lorem Ipsum dolor\n* Lorem Ipsum dolor\n* Lorem Ipsum dolor"
            }
          />
          <WhyCard
            ref={cards}
            color={colors["secondary"]}
            icon={weight}
            title="Масштабируемость"
            text={
              "Lorem ipsum dolor sit amet:\n\n* Lorem Ipsum dolor\n* Lorem Ipsum dolor\n* Lorem Ipsum dolor"
            }
          />
          <WhyCard
            ref={cards}
            color={colors["tertiary"]}
            icon={question}
            title="Оптимизация"
            text={
              "Lorem ipsum dolor sit amet:\n\n* Lorem Ipsum dolor\n* Lorem Ipsum dolor\n* Lorem Ipsum dolor"
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
        <LinedHeader
          ref={makeRef(slideHeader, "text")}
          text={"Инструментарий"}
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
    </Rect>,
  );

  transition.overlay().scale([0, 1]);
  cards.forEach((c) => {
    c.scale(0.5);
    c.opacity(0);
    c.margin([0, 200, 0, 0]);
  });

  yield* all(
    slideHeader.text.text("Почему именно мы?", 1),
    ...cards.map((c) => all(c.scale(1, 1), c.opacity(1, 1), c.margin(0, 1))),
  );

  yield* beginSlide("Slide 8");
  yield* transition.overlay().scale([1, 1], 1);
  yield* waitTransition(0);
});
