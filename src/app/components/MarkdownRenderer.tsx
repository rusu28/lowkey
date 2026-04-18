import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Customize code blocks
          code({ node, inline, className, children, ...props }: any) {
            return inline ? (
              <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            ) : (
              <code className={`block bg-muted p-4 rounded-lg overflow-x-auto ${className}`} {...props}>
                {children}
              </code>
            );
          },
          // Customize tables
          table({ children, ...props }: any) {
            return (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          th({ children, ...props }: any) {
            return (
              <th className="border bg-muted px-4 py-2 text-left" {...props}>
                {children}
              </th>
            );
          },
          td({ children, ...props }: any) {
            return (
              <td className="border px-4 py-2" {...props}>
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
