import { NodeInput, Node } from 'gatsby';
import { getPackageName } from '../utils/getPackageName';

type CreateNodeFn = (node: NodeInput) => void;
type CreateParentChildLinkFn = (args: { parent: Node, child: Node }) => void;

export async function createLinkedNodes(
  nodes: NodeInput[],
  createNode: CreateNodeFn,
  createParentChildLink: CreateParentChildLinkFn,
): Promise<void> {
  nodes.forEach(async (node: NodeInput) => {
    await createNode(node);
  });

  nodes.forEach((parent: NodeInput) => {
    if (!parent.children) {
      return;
    }

    const childNodes: NodeInput[] = parent.children
      .map((id: string) => {
        return nodes.find((childNode: NodeInput) => childNode.id === id);
      })
      .filter((childNode: NodeInput | undefined): childNode is NodeInput => !!childNode);

    childNodes.forEach(async (child: NodeInput) => {
      if (!parent.parent || !child.parent) {
        return;
      }

      // @todo: remove nodeInputToNode when https://github.com/gatsbyjs/gatsby/issues/19993 will be fixed
      await createParentChildLink({
        parent: nodeInputToNode(parent),
        child: nodeInputToNode(child),
      });
    });
  });
}

function nodeInputToNode(nodeInput: NodeInput): Node {
  return {
    ...nodeInput,
    parent: nodeInput.parent || '',
    children: nodeInput.children || [],
    internal: {
      ...nodeInput.internal,
      owner: nodeInput.owner as string || getPackageName(),
    },
  };
}
