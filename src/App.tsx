import { useState, useMemo } from 'react';
import { posts } from './data/posts';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { TagFilter } from './components/TagFilter';
import { Post } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags.includes(selectedTag));
  }, [selectedTag]);

  const selectedPost = useMemo(() => {
    return posts.find(p => p.id === selectedPostId) || null;
  }, [selectedPostId]);

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.main 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-6 py-24"
          >
            {/* Header */}
            <header className="mb-24">
              <h1 className="text-sm uppercase tracking-[0.3em] font-medium mb-2">Writing & Thoughts</h1>
              <p className="text-black/40 font-light italic">A minimalist space for long-form reflection.</p>
            </header>

            {/* Filter */}
            <TagFilter 
              tags={allTags} 
              selectedTag={selectedTag} 
              onSelectTag={setSelectedTag} 
            />

            {/* List */}
            <div className="mt-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onClick={() => setSelectedPostId(post.id)} 
                  />
                ))
              ) : (
                <div className="py-24 text-center opacity-30 font-light italic">
                  No writings found in this category.
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="mt-32 pt-12 border-t border-black/5 flex justify-between items-center text-[10px] uppercase tracking-widest font-medium opacity-30">
              <div>© 2026 Personal Blog</div>
              <div className="flex gap-4">
                <a href="#" className="hover:opacity-100">RSS</a>
                <a href="#" className="hover:opacity-100">Github</a>
              </div>
            </footer>
          </motion.main>
        ) : (
          <PostDetail 
            key="detail"
            post={selectedPost} 
            onBack={() => setSelectedPostId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
