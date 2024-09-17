import { Img, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  createRef,
  makeRef,
  waitFor,
  waitTransition,
} from "@motion-canvas/core";
import { colors, gradient, sizes } from "../../config";

import { HackathonBrand, TeamLogo } from "../../ui/brand";
import { H1, Paragraph } from "../../ui/typography";
import { LinedHeader } from "../../ui/util";

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const card = {
    base: null as Rect,
    summary: null as Txt,
    title: null as Txt,
    date: null as Txt,
    team: null as Layout,
    brand: null as Img,
  };

  const slideHeader = {
    container: null as Rect,
    text: null as Txt,
  };

  view.add(
    <Rect ref={surface} width={1920} height={1080} fill={gradient} padding={40}>
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
      <HackathonBrand ref={makeRef(card, "brand")} y={459} />
      <Rect
        layout
        y={491}
        width={"100%"}
        ref={makeRef(slideHeader, "container")}
        padding={40}
      >
        <LinedHeader ref={makeRef(slideHeader, "text")} />
      </Rect>
    </Rect>,
  );

  card.base.height(96);
  slideHeader.container.opacity(0);

  yield* beginSlide("Slide 0");
  yield* all(card.base.height(null, 1));
  yield* beginSlide("Slide 1");

  yield* all(
    card.base.size([1920, 1080], 1),
    card.base.radius(0, 1),
    surface().padding(0, 1),
    card.brand.scale(0, 1),
    card.brand.height(0, 1),
    card.title.opacity(0, 1),
    card.team.opacity(0, 1),
    waitFor(
      0.5,
      all(
        card.summary.text(
          "Интеллектуальный помощник оператора службы поддержки",
          1,
        ),
        card.date.text("02/10", 1),
        slideHeader.container.opacity(1, 1),
      ),
    ),
  );
  yield* waitTransition(0);
});
