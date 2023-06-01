function isPrimitive(test: unknown): boolean {
  return (
    typeof test === 'string' ||
    typeof test === 'number' ||
    typeof test === 'boolean' ||
    test === null ||
    test === undefined
  );
}

function identity(input: unknown): unknown {
  return input;
}

type TCallback<In = unknown, Out = unknown> = (
  chunk: In,
  chunkKey: string | number,
  parentKey: string | number,
  depth: number,
) => Out;

/**
 *
 * @param chunk Object chunk to traverse
 * @param c Callback called on each item (node/leaf) allowing to transform it by returning new value defaults to idendity
 * @param chunkKey Current chunk key
 * @param ownerKey Owner of the chunk key (aka parent)
 * @param depth The iteration depth
 * @returns transformed (or not) chunk
 */
function traverse<In = unknown>(
  chunk: In,
  c: TCallback = identity,
  chunkKey: string | number = '',
  ownerKey: string | number = '',
  depth = 0,
): unknown {
  if (isPrimitive(chunk)) {
    return c(chunk, chunkKey, ownerKey, depth);
  } else if (Array.isArray(chunk)) {
    return c(
      chunk.map((i: unknown, index): unknown => {
        if (isPrimitive(i)) {
          return c(i, index, chunkKey, depth);
        }
        return c(traverse(i, c, index, chunkKey, depth + 1), index, chunkKey, depth);
      }),
      chunkKey,
      ownerKey,
      depth,
    );
  } else {
    // an object for sure
    const v = chunk as any;
    const k = Object.keys(v);
    return c(
      k.reduce((acc, key) => {
        const data = v[key];
        return {
          ...acc,
          [key]: c(
            isPrimitive(data) ? data : traverse(data, c, key, chunkKey, depth + 1),
            key,
            chunkKey,
            depth,
          ),
        };
      }, {}),
      chunkKey,
      ownerKey,
      depth,
    );
  }
}

// console.log(
//   traverse(
//     { a: '1', 'b.c': { c: '3', d: ['4', '5'] }, e: false },
//     function walker(
//       chunk: unknown,
//       chunkKey: string | number,
//       ownerKey: string | number,
//       depth: number,
//     ) {
//       console.log(
//         depth === 0 && ownerKey === '' ? '<ROOT>' : ownerKey,
//         `${chunkKey}: ${chunk}`,
//         depth,
//       );

//       if (chunk && typeof chunk === 'object' && chunk !== null && !Array.isArray(chunk)) {
//         // already processed
//         return Object.keys(chunk).reduce((o, key) => {
//           const fieldName = key.replaceAll('.', '-');
//           return { ...o, [fieldName]: (chunk as any)[key] };
//         }, {});
//       }

//       return chunk;
//     },
//   ),
// );

export default traverse;
