// src/components/LegalPages.tsx
import { Component } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import MarkdownViewer from './MarkdownViewer';

interface LegalPagesProps {
  path: string;
}

const LegalPages: Component<LegalPagesProps> = (props) => {
  const navigate = useNavigate();
  
  return (
    <div class="legal-page">
      <button onclick={() => navigate('/')} class="back-button">
        Volver
      </button>
      <MarkdownViewer path={props.path} />
    </div>
  );
};

export default LegalPages;