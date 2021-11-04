import Polygon from "./polygon.js";

export default class Editor {
  constructor() {
    this.editor = SVG().addTo("#editor").size(600, 600);
    this.rect = this.editor.rect(600, 600).attr({ fill: "gray" });
    this.hexagons();
    this.color = "white";
  }

  hexagons = () => {
    let shift = 0;
    for (let i = 0; i <= 36; i++) {
      this.draw(i, shift);
    }
    shift = 1;
    for (let i = 0; i <= 35; i++) {
      this.draw(i, shift);
    }
    let ok = document.getElementById("ok");
    let x = document.getElementById("x");
    let upper;
    let lower;
    ok.addEventListener("click", () => {
      let polygons = document.querySelectorAll("#editor > svg > polygon");
      let fillAttributes = [];
      polygons.forEach((hex) => {
        fillAttributes.push(
          hex.getAttribute("fill") === null ? "-" : hex.getAttribute("fill")
        );
      });
      let fillAttributeString = fillAttributes
        .join("")
        .replaceAll("red", "s")
        .replaceAll("white", "v")
        .replaceAll("#000000", "-");
      upper = fillAttributeString.substring(0, 37);
      lower = fillAttributeString.substring(37, 73);
      console.log(upper);
      console.log(lower);
      let upperStart = 0;
      let lowerStart = 0;
      while (upper[upperStart] === "-") upperStart++;
      while (lower[lowerStart] === "-") lowerStart++;
      let upperEnd = upper.length - 1;
      let lowerEnd = lower.length - 1;
      while (upper[upperEnd] === "-") upperEnd--;
      while (lower[lowerEnd] === "-") lowerEnd--;
      console.log(upperEnd, lowerEnd, upperStart - lowerStart, upperEnd - lowerEnd);
      const regex = /^[-]*[sv]{4,}[-]*$/g
      if (((upperStart - lowerStart) === 0 || (upperStart - lowerStart) === 1)
        && ((upperEnd - lowerEnd) === 0 || (upperEnd - lowerEnd) === 1)
        && upper.match(regex)
        && lower.match(regex))
        console.log("Ok!")
      else console.log("Valami nincs rendben!")
    });
  };

  draw = (i, shift) => {
    let poly = this.editor.polygon(
      Polygon.hex(shift * 8 + (5 + 16 * i), shift * 41 + 10)
    );
    poly.attr({
      "fill-opacity": 0.0001,
      stroke: "white",
      "stroke-width": 1,
    });

    poly.on("click", (e) => {
      if (poly.attr("fill") === "#000000") {
        poly.attr({
          "fill-opacity": 1,
          "stroke-width": 0,
          fill: this.color,
        });
      } else {
        poly.fill(
          (this.color = poly.attr("fill") === "white" ? "red" : "white")
        );
      }
    });
    poly.on(["contextmenu", "dblclick"], (e) => {
      e.preventDefault();
      poly.attr({
        "fill-opacity": 0.0001,
        stroke: "white",
        "stroke-width": 1,
        fill: "#000000",
      });
    });
  };
}
