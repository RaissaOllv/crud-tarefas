let tarefas = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(tarefas);
  }
  if (req.method === 'POST') {
    const novaTarefa = { id: Date.now(), ...req.body };
    tarefas.push(novaTarefa);
    return res.status(201).json(novaTarefa);
  }
  if (req.method === 'PUT') {
    const { id } = req.query;
    const index = tarefas.findIndex(t => t.id == id);
    if (index === -1) return res.status(404).json({ message: 'Tarefa não encontrada' });
    tarefas[index] = { ...tarefas[index], ...req.body };
    return res.json({ message: 'Tarefa atualizada' });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    tarefas = tarefas.filter(t => t.id != id);
    return res.json({ message: 'Tarefa deletada' });
  }
  return res.status(405).json({ message: 'Método não permitido' });
}
