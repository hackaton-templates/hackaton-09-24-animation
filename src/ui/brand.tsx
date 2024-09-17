import { CircleProps, Img, ImgProps } from "@motion-canvas/2d";

import admin from "../assets/admin.png";
import ai from "../assets/ai.png";
import hack from "../assets/hack.png";
import mzhn from "../assets/mzhn.png";

export function TeamLogo(props: ImgProps) {
  return <Img src={mzhn} size={64} radius={1000} {...props} />;
}

export function HackathonBrand(props: ImgProps) {
  return <Img src={hack} width={600} height={82} {...props} />;
}

export function AILogo(props: CircleProps) {
  return <Img src={ai} size={64} radius={1000} {...props} />;
}

export function AdminLogo(props: CircleProps) {
  return <Img src={admin} size={64} radius={1000} {...props} />;
}
