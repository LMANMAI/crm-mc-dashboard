import React, { useState } from 'react';
import { useCopyStore } from '../store/useCopyStore';

export const CopyForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addCopy = useCopyStore((state) => state.addCopy);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    addCopy({ title, content, authorId: 'user-123' });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px' }}>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '8px' }} />
      <textarea placeholder="Contenido..." value={content} onChange={(e) => setContent(e.target.value)} style={{ padding: '8px', minHeight: '100px' }} />
      <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Guardar Copy</button>
    </form>
  );
};
