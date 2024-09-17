import { Img, Layout, LayoutProps, Node, Rect } from "@motion-canvas/2d";
import { colors, sizes } from "../../../config";
import { AILogo, TeamLogo } from "../../../ui/brand";
import { Window, WindowProps } from "../../../ui/card";
import { Paragraph } from "../../../ui/typography";

import {
  all,
  createRef,
  createRefArray,
  Reference,
  ReferenceArray,
  sequence,
} from "@motion-canvas/core";
import pin from "../../../assets/pin.png";

interface ChatEntryProps extends LayoutProps {
  text: string;
  mirror?: boolean;
}

function ChatEntry({ mirror = false, text, ...props }: ChatEntryProps) {
  return (
    <Layout
      alignItems={"center"}
      gap={15}
      direction={mirror ? "row" : "row-reverse"}
      justifyContent={mirror ? "start" : "end"}
      {...props}
    >
      {mirror ? <AILogo /> : <TeamLogo />}
      <Rect layout padding={[20, 40]} fill={colors["overlay"]} radius={15}>
        <Paragraph
          text={text}
          fontSize={sizes["md"]}
          fill={colors["text_white"]}
        />
      </Rect>
    </Layout>
  );
}

export class ChatWindow extends Node {
  private readonly window: Reference<Window>;
  private readonly entries: ReferenceArray<Layout>;

  constructor(props: WindowProps) {
    super({});
    this.window = createRef();
    this.entries = createRefArray<Layout>();

    this.add(
      <Window ref={this.window} {...props}>
        <Layout width={"100%"} direction={"column"}>
          <Layout
            padding={[20, 30]}
            gap={40}
            direction={"column"}
            width={"100%"}
          >
            <ChatEntry
              ref={this.entries}
              text={"Как я могу найти своё\nлюбимое видео с котиками?"}
            />
            <ChatEntry
              ref={this.entries}
              text={
                "Привет! Для этого тебе нужно\nперейти во вкладку Моё\nна главной странице!"
              }
              mirror
            />
            <ChatEntry ref={this.entries} text={"Спасибо ❤"} />
          </Layout>
          <Rect
            width={"100%"}
            fill={colors["overlay"]}
            padding={30}
            layout
            justifyContent={"space-between"}
          >
            <Paragraph text="Напишите сообщение..." fontSize={sizes["sm"]} />
            <Img src={pin} width={16} height={32} />
          </Rect>
        </Layout>
      </Window>,
    );

    this.entries.forEach((e) => {
      e.opacity(0);
      e.padding([0, 40]);
    });
  }

  public *animate() {
    yield* this.window().animate();
    yield* sequence(
      1,
      ...this.entries.map((e) => all(e.opacity(1, 1), e.padding(0, 1))),
    );
  }
}
