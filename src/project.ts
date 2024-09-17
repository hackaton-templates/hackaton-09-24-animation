import { makeProject } from "@motion-canvas/core";
import "./style.css";

import slide1 from "./scenes/slide1/slide1?scene";
import slide10 from "./scenes/slide10/slide10?scene";
import slide2 from "./scenes/slide2/slide2?scene";
import slide3 from "./scenes/slide3/slide3?scene";
import slide4 from "./scenes/slide4/slide4?scene";
import slide5 from "./scenes/slide5/slide5?scene";
import slide6 from "./scenes/slide6/slide6?scene";
import slide7 from "./scenes/slide7/slide7?scene";
import slide8 from "./scenes/slide8/slide8?scene";
import slide9 from "./scenes/slide9/slide9?scene";

export default makeProject({
  scenes: [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
    slide9,
    slide10,
  ],
});
