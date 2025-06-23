let tarefas = [];

export default function handler(req, res) {
  // Libera CORS para todas as origens (pode ajustar para seu domínio específico se quiser)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde rápido ao OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
    if (index === -1) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tarefas[index] = { ...tarefas[index], ...req.body };
    return res.json({ message: 'Tarefa atualizada', tarefa: tarefas[index] });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const quantidadeAntes = tarefas.length;
    tarefas = tarefas.filter(t => t.id != id);
    if (tarefas.length === quantidadeAntes) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.json({ message: 'Tarefa deletada' });
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
