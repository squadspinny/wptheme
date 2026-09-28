import React, { useState } from 'react';
import { ArticleSection, ListItem } from '../types';
import { ArticleFAQ } from './ArticleFAQ';
import { Terminal, Copy, Check, Info, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface ArticleSectionProps {
  section: ArticleSection;
}

export const CodeBlock: React.FC<{ code: string; label?: string }> = ({ code, label = 'Command' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-4 sm:p-5 space-y-2.5 rounded-[1px] my-3">
      <div className="flex items-center justify-between text-xs text-gray-400 font-mono border-b border-gray-800 pb-2">
        <span className="flex items-center gap-2 text-gray-300">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span>{label}</span>
        </span>
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-[1px]"
          title="Copy command to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="text-xs sm:text-sm text-emerald-400 font-mono font-medium overflow-x-auto py-1 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const ArticleSectionRenderer: React.FC<ArticleSectionProps> = ({ section }) => {
  switch (section.type) {
    case 'heading': {
      const level = section.level ?? 2;
      if (level === 3) {
        return <h3 id={section.id}>{section.title}</h3>;
      }
      if (level === 4) {
        return <h4 id={section.id}>{section.title}</h4>;
      }
      return <h2 id={section.id}>{section.title}</h2>;
    }

    case 'paragraph': {
      return <p>{section.content}</p>;
    }

    case 'label': {
      return <p className="font-bold text-gray-900 pt-1">{section.text}</p>;
    }

    case 'list': {
      const renderItem = (item: ListItem, idx: number) => {
        if (typeof item === 'string') {
          return <li key={idx}>{item}</li>;
        }
        return (
          <li key={idx}>
            <span>{item.text}</span>
            {item.command && <CodeBlock code={item.command} />}
          </li>
        );
      };

      if (section.ordered) {
        return (
          <ol className="list-decimal list-outside ml-5 space-y-1.5 text-gray-700">
            {section.items.map((item, idx) => renderItem(item, idx))}
          </ol>
        );
      }

      return (
        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
          {section.items.map((item, idx) => renderItem(item, idx))}
        </ul>
      );
    }

    case 'code': {
      return <CodeBlock code={section.code} label={section.label || 'Command'} />;
    }

    case 'table': {
      return (
        <div className="my-6 overflow-x-auto border border-gray-200 rounded-[1px] shadow-xs">
          {section.caption && (
            <div className="bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
              {section.caption}
            </div>
          )}
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            {section.headers && section.headers.length > 0 && (
              <thead className="bg-gray-100/75">
                <tr>
                  {section.headers.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      scope="col"
                      className="px-4 py-3 font-bold text-gray-900 border-b border-gray-200 text-xs sm:text-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-gray-200 bg-white">
              {section.rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-gray-700 text-xs sm:text-sm">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'callout': {
      const variant = section.variant || 'info';
      const variantStyles = {
        info: 'bg-blue-50/70 border-blue-200 text-blue-900',
        warning: 'bg-amber-50/70 border-amber-200 text-amber-900',
        tip: 'bg-emerald-50/70 border-emerald-200 text-emerald-900',
        note: 'bg-slate-50 border-slate-200 text-slate-900',
      };
      const Icon = {
        info: Info,
        warning: AlertTriangle,
        tip: Lightbulb,
        note: CheckCircle2,
      }[variant];

      return (
        <div className={`p-4 sm:p-5 border rounded-[1px] my-5 space-y-1.5 ${variantStyles[variant]}`}>
          {section.title && (
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <Icon className="w-4 h-4 shrink-0" />
              <span>{section.title}</span>
            </div>
          )}
          <p className="text-xs sm:text-sm leading-relaxed">{section.content}</p>
        </div>
      );
    }

    case 'faq': {
      return (
        <div className="my-6">
          {section.title && <h2>{section.title}</h2>}
          <ArticleFAQ items={section.items} />
        </div>
      );
    }

    default:
      return null;
  }
};
