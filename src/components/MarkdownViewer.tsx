// src/components/MarkdownViewer.tsx
import { Component, createResource } from 'solid-js';
import { marked } from 'marked';

interface MarkdownViewerProps {
  path: string;
}

const MarkdownViewer: Component<MarkdownViewerProps> = (props) => {
  const [markdownContent] = createResource(() => props.path, async () => {
    const response = await fetch(props.path);
    const text = await response.text();
    return marked(text);
  });

  return (
    <div class="markdown-container">
      <div class="markdown-content" innerHTML={markdownContent()} />
    </div>
  );
};

export default MarkdownViewer;