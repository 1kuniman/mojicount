import type { Block } from "@/lib/types";

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-20 text-xl sm:text-2xl font-bold text-gray-800 border-l-4 border-pink-400 pl-3 pt-4"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="text-lg font-bold text-pink-700 pt-2">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[15px] leading-8 text-gray-700">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-pink-400 mt-0.5 flex-shrink-0">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-[15px] leading-7 text-gray-700">
                    <span className="flex-shrink-0 bg-pink-100 text-pink-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside
                key={i}
                className="rounded-xl border border-pink-200 bg-pink-50 p-4 sm:p-5"
              >
                {block.title && (
                  <p className="font-bold text-pink-700 mb-1.5 text-sm flex items-center gap-1.5">
                    <span>💡</span> {block.title}
                  </p>
                )}
                <p className="text-sm leading-7 text-gray-700">{block.text}</p>
              </aside>
            );
          case "table":
            return (
              <figure key={i} className="my-2">
                <div className="overflow-x-auto rounded-xl border border-pink-100">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-pink-100/70 text-pink-800">
                        {block.headers.map((h, j) => (
                          <th
                            key={j}
                            className="text-left font-semibold px-3 py-2.5 whitespace-nowrap border-b border-pink-100"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className={r % 2 ? "bg-pink-50/40" : "bg-white"}>
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className="px-3 py-2.5 text-gray-700 border-b border-pink-50 align-top"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption className="text-xs text-gray-400 mt-1.5 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
