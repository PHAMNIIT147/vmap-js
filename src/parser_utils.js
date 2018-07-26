/**
 * Returns all the elements of the given node which nodeName match the given name.
 * @param  {any} node - The node to use to find the matches.
 * @param  {any} name - The name to look for.
 * @return {Array}
 */
function childrenByName(node, name) {
  const children = [];
  const childNodes = node.childNodes;

  for (let childKey in childNodes) {
    const child = childNodes[childKey];

    if (
      child.nodeName === name ||
      (child.nodeName &&
        child.nodeName.match(/vmap:(.*)/) &&
        child.nodeName.match(/vmap:(.*)/)[1] === name)
    ) {
      children.push(child);
    }
  }
  return children;
}

/**
 * Parses a node text (for legacy support).
 * @param  {Object} node - The node to parse the text from.
 * @return {String}
 */
function parseNodeText(node) {
  return (
    node &&
    node.childNodes &&
    [...node.childNodes]
      .filter(node => node.nodeName === '#text')
      .reduce((previous, current) => previous + current.textContent.trim(), '')
  );
}

/**
 * Parses an XML node recursively.
 * @param  {Object} node - The node to parse.
 * @return {Object}
 */
function parseXMLNode(node) {
  const parsedNode = {
    attributes: {},
    children: {},
    value: null
  };

  const value = parseNodeText(node);
  if (value) {
    parsedNode.value = value;
  }

  const nodeAttrs = node.attributes;
  if (nodeAttrs) {
    for (let nodeAttrKey in nodeAttrs) {
      const nodeAttr = nodeAttrs[nodeAttrKey];

      if (
        nodeAttr.nodeName &&
        nodeAttr.nodeValue !== undefined &&
        nodeAttr.nodeValue !== null
      ) {
        parsedNode.attributes[nodeAttr.nodeName] = nodeAttr.nodeValue;
      }
    }
  }

  [...node.childNodes]
    .filter(
      childNode =>
        childNode.nodeName !== '#text' && childNode.nodeName !== '#comment'
    )
    .forEach(childNode => {
      parsedNode.children[childNode.nodeName] = parseXMLNode(childNode);
    });

  return parsedNode;
}

export { childrenByName, parseNodeText, parseXMLNode };