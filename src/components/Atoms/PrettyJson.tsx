import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Container from './Container';

export default function PrettyJson(rawCode: any) {
  const code = JSON.stringify(rawCode, null, 2);
  return (
    <Container>
      <span className="text-xs font-semibold text-gray-200 uppercase">
        Show JSON
      </span>
      <input
        id={`${rawCode.id}-choice-yes`}
        type="checkbox"
        className="peer w-12"
      />

      <div className="hidden max-h-128 overflow-y-scroll text-xs peer-checked:block">
        <SyntaxHighlighter wrapLines wrapLongLines language="json">
          {code}
        </SyntaxHighlighter>
      </div>
    </Container>
  );
}
