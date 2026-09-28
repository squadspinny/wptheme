import React, { useState } from 'react';
import { ArticleFAQItem } from '../types';
import { ChevronDown } from 'lucide-react';

interface ArticleFAQProps {
  items: ArticleFAQItem[];
}

export const ArticleFAQ: React.FC<ArticleFAQProps> = ({ items }) => {
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 my-6 not-prose">
      {items.map((faq, index) => {
        const isOpen = openFaqIndexes.includes(index);
        return (
          <div
            key={index}
            className="border border-gray-200 bg-white rounded-[1px] shadow-xs overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left font-bold text-gray-900 hover:text-blue-600 hover:bg-gray-50/75 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-bold pr-2 leading-snug text-gray-900">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 sm:px-5 pb-4 pt-1 text-gray-700 text-xs sm:text-sm leading-relaxed border-t border-gray-100 bg-gray-50/40">
                <p className="!mb-0 text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
