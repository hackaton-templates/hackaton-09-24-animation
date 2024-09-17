import {
  Circle,
  Layout,
  LayoutProps,
  Node,
  Rect,
  RectProps,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefArray,
  Reference,
  ReferenceArray,
  sequence,
} from "@motion-canvas/core";
import { colors, sizes } from "../../../config";
import { AdminLogo, AILogo, TeamLogo } from "../../../ui/brand";
import { Window, WindowProps } from "../../../ui/card";
import { Paragraph } from "../../../ui/typography";

interface ChatContactProps {
  title: string;
  selected?: boolean;
  avatar: string;
}

interface ChatEntryProps extends LayoutProps {
  text: string;
  mirror?: boolean;
  avatar: Node;
}

interface ChatSystemEntryProps extends RectProps {
  text: string;
}

function ChatContact({ title, selected = false, avatar }: ChatContactProps) {
  return (
    <Rect
      width={"100%"}
      fill={selected ? colors["overlay"] : colors["surface"]}
      padding={20}
      gap={20}
      layout
      alignItems={"center"}
    >
      <Circle size={64} fill={avatar} />
      <Paragraph text={title} fill={colors["text_white"]} />
    </Rect>
  );
}

function ChatEntry({ mirror = false, text, avatar, ...props }: ChatEntryProps) {
  return (
    <Layout
      alignItems={"center"}
      gap={15}
      direction={mirror ? "row" : "row-reverse"}
      justifyContent={mirror ? "start" : "end"}
      {...props}
    >
      {avatar}
      <Rect layout padding={[20, 40]} fill={colors["overlay"]} radius={15}>
        <Paragraph
          text={text}
          fontSize={sizes["md"]}
          fill={colors["text_white"]}
          textAlign={mirror ? "left" : "right"}
        />
      </Rect>
    </Layout>
  );
}

function ChatSystemEntry({ text, ...props }: ChatSystemEntryProps) {
  return (
    <Rect
      justifyContent={"center"}
      padding={[10, 20]}
      fill={colors["overlay"]}
      radius={15}
      {...props}
    >
      <Paragraph
        text={text}
        fontSize={sizes["sm"]}
        fill={colors["text_white"]}
      />
    </Rect>
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
        <Layout width={450} direction={"column"}>
          <ChatContact title="Клиент 1" avatar={colors["primary"]} selected />
          <ChatContact title="Клиент 2" avatar={colors["secondary"]} />
          <ChatContact title="Клиент 3" avatar={colors["tertiary"]} />
        </Layout>
        <Layout
          width={"100%"}
          direction={"column"}
          justifyContent={"space-between"}
        >
          <Layout
            padding={[20, 30]}
            gap={20}
            direction={"column"}
            width={"100%"}
          >
            <ChatEntry
              ref={this.entries}
              text={"Как я могу скачать видео\nс Вашего сайта?"}
              mirror
              avatar={<TeamLogo />}
            />
            <ChatEntry
              ref={this.entries}
              text={`Кажется, у меня нет ответа\nна Ваш вопрос :(\n\nПереключаю на оператора!`}
              avatar={<AILogo />}
            />
            <ChatSystemEntry
              ref={this.entries}
              text="Оператор Александр присоединился к чату"
            />
            <ChatEntry
              ref={this.entries}
              text={`Для того, чтобы скачать видео,\nнажмите на кнопку Поделиться\nпод проигрывателем!`}
              avatar={<AdminLogo />}
            />
            <ChatSystemEntry
              ref={this.entries}
              text="База знаний пополнена записью “Скачивание видео с сайта”"
            />
          </Layout>
          <Rect
            width={"100%"}
            fill={colors["overlay"]}
            padding={30}
            layout
            justifyContent={"space-between"}
          >
            <Paragraph text="Напишите сообщение..." fontSize={sizes["sm"]} />
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
