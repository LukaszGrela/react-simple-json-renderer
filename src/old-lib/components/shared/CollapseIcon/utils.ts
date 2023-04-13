export function toggleNodeCollapsed(marginLeft, key, marginLeftStep) {
  const { collapsedNodes } = this.state;
  const level = marginLeft / marginLeftStep;
  const keys = collapsedNodes[level] || {};

  if (keys[key]) delete keys[key];
  //keys[key] = false ?
  else keys[key] = true;
  collapsedNodes[level] = keys;

  this.setState({ collapsedNodes });
}

export function isNodeCollapsed(marginLeft, key, marginLeftStep) {
  const { collapsedNodes } = this.state;
  const level = marginLeft / marginLeftStep;
  if (!collapsedNodes[level]) return false;
  return collapsedNodes[level][key];
}
