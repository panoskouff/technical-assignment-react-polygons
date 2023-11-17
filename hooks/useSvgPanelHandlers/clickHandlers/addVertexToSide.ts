import { Action, State } from '#/types/state/polygons';

export const addVertexToSide = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  const target = event.target as SVGElement;

  if (target.tagName === 'line') {
    const polygonId = target.parentElement?.getAttribute('data-polygonId');
    if (!polygonId) {
      console.error('svgClickHandler: Missing polygonId');
      return;
    }
    const x = target.getAttribute('x1');
    const y = target.getAttribute('y1');
    if (!x || !y) {
      // here to satisfy typescript - this should never happen
      console.error('svgClickHandler: Missing x or y');
      return;
    }
    const prevPoint = { x: parseInt(x), y: parseInt(y) };
    const newPoint = { x: event.clientX, y: event.clientY };
    dispatch({
      type: 'ADD_VERTEX_TO_SIDE',
      payload: { polygonId, prevPoint, newPoint },
    });
  }
};
