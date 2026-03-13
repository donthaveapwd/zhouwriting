import React from 'react';
import Markdown from 'react-markdown';
import { Post } from '../types';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const date = new Date(post.date);
  const formattedDate = format(date, 'yyyy年MM月dd日', { locale: zhCN });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium opacity-40 hover:opacity-100 transition-opacity mb-12"
      >
        <ArrowLeft size={14} />
        返回列表
      </button>

      <header className="mb-16">
        <div className="flex gap-2 mb-4">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="text-[10px] uppercase tracking-widest font-semibold border border-black/20 px-2 py-0.5 rounded-full opacity-60"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
          {post.title}
        </h1>
        <div className="text-sm font-light opacity-40">
          发布于 {formattedDate}
        </div>
      </header>

      <div className="markdown-body">
        <Markdown>{post.content}</Markdown>
      </div>
      
      <footer className="mt-24 pt-12 border-t border-black/5 text-center">
        <button 
          onClick={onBack}
          className="text-xs uppercase tracking-widest font-medium opacity-40 hover:opacity-100 transition-opacity"
        >
          End of Article
        </button>
      </footer>
    </motion.div>
  );
};
