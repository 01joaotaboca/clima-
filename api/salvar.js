import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // Configuração para permitir que o seu HTML envie os dados
  if (request.method === 'POST') {
    try {
      const novosDados = request.body;
      
      // Salva no banco da Vercel com a chave 'meu_pluviometro'
      // O dado é guardado como um JSON gigante
      await kv.set('meu_pluviometro', novosDados);
      
      return response.status(200).json({ message: 'Sincronizado com sucesso!' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // Se você quiser que o App puxe os dados da nuvem ao abrir
  if (request.method === 'GET') {
    const dadosSalvos = await kv.get('meu_pluviometro');
    return response.status(200).json(dadosSalvos || []);
  }
}

