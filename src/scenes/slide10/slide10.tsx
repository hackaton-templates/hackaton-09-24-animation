import { Img, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  createRef,
  createRefMap,
  makeRef,
} from "@motion-canvas/core";
import { colors, gradient, sizes } from "../../config";

import qr from "../../assets/qr.png";
import { HackathonBrand, TeamLogo } from "../../ui/brand";
import { H1, Paragraph } from "../../ui/typography";

export default makeScene2D(function* (view) {
  const surface = createRef<Rect>();
  const transition = createRefMap<Rect>();

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
      <Img ref={transition.qr} width={256} src={qr} y={150} />

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
    </Rect>,
  );

  card.brand.scale(0.5);
  card.brand.opacity(0);
  transition.qr().opacity(0);

  yield* all(
    card.brand.scale(1, 1),
    card.brand.opacity(1, 1),
    card.base.y(-150, 1),
    transition.qr().y(210, 1),
    transition.qr().opacity(1, 1),
  );

  yield* beginSlide("Slide 10");
});
