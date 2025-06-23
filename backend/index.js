
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_PATH = './backend/db.json';

function getTasks() {
  return JSON.parse(fs.readFileSync(DB_PATH));
}

app.get('/tarefas', (req, res) => {
  res.json(getTasks());
});

app.post('/tarefas', (req, res) => {
  const tarefas = getTasks();
  const novaTarefa = { id: Date.now(), ...req.body };
  tarefas.push(novaTarefa);
  fs.writeFileSync(DB_PATH, JSON.stringify(tarefas, null, 2));
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  let tarefas = getTasks();
  tarefas = tarefas.map(t =>
    t.id == req.params.id ? { ...t, ...req.body } : t
  );
  fs.writeFileSync(DB_PATH, JSON.stringify(tarefas, null, 2));
  res.json({ message: 'Tarefa atualizada' });
});

app.delete('/tarefas/:id', (req, res) => {
  let tarefas = getTasks();
  tarefas = tarefas.filter(t => t.id != req.params.id);
  fs.writeFileSync(DB_PATH, JSON.stringify(tarefas, null, 2));
  res.json({ message: 'Tarefa deletada' });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
