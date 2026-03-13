import React from 'react';
import { Post } from '../types';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const date = new Date(post.date);
  const month = format(date, 'MMM', { locale: zhCN });
  const day = format(date, 'dd');

  return (
    <div 
      id={`post-${post.id}`}
      className="group flex gap-8 md:gap-16 py-12 border-b border-black/5 cursor-pointer transition-colors hover:bg-black/[0.01]"
      onClick={onClick}
    >
      {/* Date Section */}
      <div className="flex flex-col items-end min-w-[60px] md:min-w-[80px]">
        <span className="text-xs uppercase tracking-widest font-medium opacity-40">{month}</span>
        <span className="text-4xl md:text-5xl font-light tracking-tighter">{day}</span>
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="text-[10px] uppercase tracking-widest font-semibold border border-black/20 px-2 py-0.5 rounded-full opacity-60"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl md:text-3xl font-light mb-4 group-hover:underline underline-offset-4 decoration-1">
          {post.title}
        </h2>
        <p className="text-black/50 font-light leading-relaxed max-w-2xl line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
};
