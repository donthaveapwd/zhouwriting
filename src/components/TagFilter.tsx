import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onSelectTag }) => {
  return (
    <div className="flex flex-wrap gap-6 py-8 border-b border-black/5">
      <button
        onClick={() => onSelectTag(null)}
        className={`text-xs uppercase tracking-widest font-medium transition-opacity ${
          selectedTag === null ? 'opacity-100 underline underline-offset-8' : 'opacity-30 hover:opacity-60'
        }`}
      >
        全部
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={`text-xs uppercase tracking-widest font-medium transition-opacity ${
            selectedTag === tag ? 'opacity-100 underline underline-offset-8' : 'opacity-30 hover:opacity-60'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
