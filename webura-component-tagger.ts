import { parse } from "@babel/parser";
import MagicString from "magic-string";
import path from "node:path";
import { walk } from "estree-walker";
import type { Plugin } from "vite";

// Vendored Webura component tagger (kept local instead of an npm package).
// Adds data-webura-id / data-webura-name attributes to JSX elements so the
// Webura editor can map a clicked element back to its source location. Unlike a
// published plugin, this has no `apply` restriction — it runs in both dev
// (serve) and the static production builds used for web previews.

const VALID_EXTENSIONS = new Set([".jsx", ".tsx"]);

// Known HTML + SVG host element names. Used to decide whether a *lowercase* JSX
// element is a real DOM node (safe to tag with data-webura-* attributes) versus a
// custom intrinsic from a non-DOM renderer like react-three-fiber (`<mesh>`,
// `<group>`, `<boxGeometry>`, `<ambientLight>`, …). Setting a `data-webura-*` prop
// on those throws inside R3F ("Cannot set data-webura-name. Ensure it is an object
// …"), so they must NOT be tagged. `line` is intentionally omitted: it is both an
// SVG element and an R3F element, and tagging the R3F one breaks — losing the tag
// on a bare SVG <line> is harmless.
const HOST_DOM_TAGS = new Set<string>([
  // HTML
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "svg",
  "g",
  "path",
  "circle",
  "ellipse",
  "polyline",
  "polygon",
  "rect",
  "text",
  "tspan",
  "defs",
  "linearGradient",
  "radialGradient",
  "stop",
  "clipPath",
  "mask",
  "pattern",
  "image",
  "use",
  "symbol",
  "marker",
  "filter",
  "foreignObject",
  "textPath",
  "switch",
  "desc",
  "metadata",
  "feGaussianBlur",
  "feOffset",
  "feBlend",
  "feColorMatrix",
  "feMerge",
  "feMergeNode",
]);

/**
 * True when this JSX element should receive data-webura-* attributes: capitalized
 * names are React components (tagged as before); lowercase names are tagged only
 * when they're a real HTML/SVG host tag or a custom element (hyphenated). This
 * skips react-three-fiber / three.js intrinsics, which are not DOM nodes.
 */
function shouldTagElement(tagName: string): boolean {
  const first = tagName[0];
  if (first && first === first.toUpperCase() && first !== first.toLowerCase()) {
    return true; // React component
  }
  return HOST_DOM_TAGS.has(tagName) || tagName.includes("-");
}

/** Returns a Vite / esbuild plug-in. */
export default function weburaComponentTagger(): Plugin {
  return {
    name: "vite-plugin-webura-tagger",
    enforce: "pre",

    async transform(code: string, id: string) {
      try {
        // Ignore non-jsx files and files inside node_modules
        if (
          !VALID_EXTENSIONS.has(path.extname(id)) ||
          id.includes("node_modules")
        )
          return null;

        const ast = parse(code, {
          sourceType: "module",
          plugins: ["jsx", "typescript"],
        });

        const ms = new MagicString(code);
        const fileRelative = path.relative(process.cwd(), id);

        walk(ast as any, {
          enter(node: any) {
            try {
              if (node.type !== "JSXOpeningElement") return;

              // ── 1. Extract the tag / component name ──────────────────────
              if (node.name?.type !== "JSXIdentifier") return;
              const tagName = node.name.name as string;
              if (!tagName) return;

              // ── 1b. Skip non-DOM intrinsics (react-three-fiber / three.js) ─
              // so we never set data-webura-* on a three object (which throws).
              if (!shouldTagElement(tagName)) return;

              // ── 2. Skip if it already has data-webura-id ─────────────────
              const alreadyTagged = node.attributes?.some(
                (attr: any) =>
                  attr.type === "JSXAttribute" &&
                  attr.name?.name === "data-webura-id",
              );
              if (alreadyTagged) return;

              // ── 3. Build the id "relative/file.jsx:line:column" ──────────
              const loc = node.loc?.start;
              if (!loc) return;
              const weburaId = `${fileRelative}:${loc.line}:${loc.column}`;

              // ── 4. Inject the attributes just after the tag name ─────────
              if (node.name.end != null) {
                ms.appendLeft(
                  node.name.end,
                  ` data-webura-id="${weburaId}" data-webura-name="${tagName}"`,
                );
              }
            } catch (error) {
              console.warn(
                `[webura-tagger] Warning: Failed to process JSX node in ${id}:`,
                error,
              );
            }
          },
        });

        // If nothing changed bail out.
        if (ms.toString() === code) return null;

        return {
          code: ms.toString(),
          map: ms.generateMap({ hires: true }),
        };
      } catch (error) {
        console.warn(
          `[webura-tagger] Warning: Failed to transform ${id}:`,
          error,
        );
        return null;
      }
    },
  };
}
