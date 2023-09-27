import { Circle } from "konva";

export function generateDot(dotProperty, fillColor = "#555555") {
  return new Circle({
    name: "dot",
    x: dotProperty.x,
    y: dotProperty.y,
    radius: dotProperty.radius,
    fill: fillColor,
    fret: dotProperty.fret,
    guitarString: dotProperty.guitarString,
  });
}
