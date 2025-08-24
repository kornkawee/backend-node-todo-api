import express from 'express';
import cors from 'cors';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json());

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

let todos: Todo[] = [];
let seq = 1;

const todoCreateSchema = z.object({
  title: z.string().min(1, 'title is required').max(200),
  completed: z.boolean().optional().default(false),
});

const todoUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed: z.boolean().optional(),
}).refine(obj => Object.keys(obj).length > 0, { message: 'Body must have at least one field' });

function nowISO() { return new Date().toISOString(); }

// Health
app.get('/health', (_req, res) => res.json({ ok: true, time: nowISO() }));

// List 
app.get('/todos', (req, res) => {
  const { q, completed } = req.query;
  let data = [...todos];
  if (typeof q === 'string' && q.trim()) {
    data = data.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
  }
  if (typeof completed === 'string') {
    if (completed === 'true' || completed === 'false') {
      const flag = completed === 'true';
      data = data.filter(t => t.completed === flag);
    }
  }
  res.json({ data, count: data.length });
});

// Get by id
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json({ data: todo });
});

// Create
app.post('/todos', (req, res) => {
  const parsed = todoCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const data = parsed.data;
  const item: Todo = {
    id: seq++,
    title: data.title,
    completed: data.completed ?? false,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };
  todos.unshift(item);
  res.status(201).json({ data: item });
});

// Update (PATCH)
app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const parsed = todoUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const current = todos[idx];
  const next: Todo = {
    ...current,
    ...parsed.data,
    updatedAt: nowISO(),
  };
  todos[idx] = next;
  res.json({ data: next });
});

// Replace (PUT)
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const parsed = todoCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const next: Todo = {
    id,
    title: parsed.data.title,
    completed: parsed.data.completed ?? false,
    createdAt: todos[idx].createdAt,
    updatedAt: nowISO(),
  };
  todos[idx] = next;
  res.json({ data: next });
});

// Delete
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [removed] = todos.splice(idx, 1);
  res.json({ data: removed });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`✅ Todo API running on http://localhost:${PORT}`);
});