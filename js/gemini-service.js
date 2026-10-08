/**
 * MEU DEVOCIONAL - GEMINI SERVICE
 * Integração multi-turn com os modelos Gemini para o Assistente Bíblico
 */

const GeminiService = (() => {
  // Modelos suportados conforme diretrizes
  const MODELOS = {
    geral: 'gemini-3.5-flash',
    complexo: 'gemini-3.1-pro-preview',
    rapido: 'gemini-3.1-flash-lite-preview'
  };

  const SYSTEM_INSTRUCTION = `Você é um Conselheiro Bíblico e Teólogo Cristão Protestante sábio, amável, acolhedor e profundamente bíblico. 
Sua missão é ajudar o usuário a meditar no Lecionário Comum Revisado (RCL), tirar dúvidas sobre textos bíblicos, doutrinas bíblicas (Sola Scriptura, Sola Gratia, Sola Fide, Solus Christus, Soli Deo Gloria) e aplicar as Escrituras na sua vida diária.
Suas respostas devem ser bíblicas, encorajadoras, focadas no Evangelho da Graça em Cristo e sempre acolhedoras. Cite passagens bíblicas relevantes (do cânon protestante de 66 livros) e faça pontes práticas com a oração diária.`;

  // API Key do projeto Firebase provisionado
  const API_KEY_DEFAULT = 'AIzaSyBxe_8l8L-9V7fVc-KZ6UXOZyIjtZDXy_U';

  function obterApiKey() {
    if (typeof window !== 'undefined' && window.GEMINI_API_KEY) {
      return window.GEMINI_API_KEY;
    }
    return API_KEY_DEFAULT;
  }

  /**
   * Envia uma mensagem e recebe resposta multi-turn do Gemini
   * @param {Array} historicoMensagens Lista de mensagens [{ role: 'user'|'model', content: string }]
   * @param {string} tipoModelo 'geral' | 'complexo' | 'rapido'
   * @returns {Promise<string>} Resposta gerada pelo modelo
   */
  async function enviarMensagem(historicoMensagens, tipoModelo = 'geral') {
    const nomeModelo = MODELOS[tipoModelo] || MODELOS.geral;
    const apiKey = obterApiKey();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${nomeModelo}:generateContent?key=${apiKey}`;

    // Monta o histórico no formato esperado pela API do Gemini
    const contents = historicoMensagens.map((msg) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content || msg.text || '' }]
    }));

    const payload = {
      contents: contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na API Gemini:', response.status, errorText);
        throw new Error(`Erro na API (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const respostaTexto = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!respostaTexto) {
        return 'Não foi possível gerar uma resposta no momento. Por favor, tente novamente.';
      }

      return respostaTexto;
    } catch (err) {
      console.error('Falha ao comunicar com Gemini:', err);
      // Resposta pastoral de fallback caso ocorra problema de rede
      return `Pedimos desculpas, não foi possível contatar o serviço no momento. Lembre-se: «O Senhor é o meu pastor; nada me faltará» (Salmo 23:1). Tente reenviar sua dúvida em instantes.`;
    }
  }

  return {
    MODELOS,
    SYSTEM_INSTRUCTION,
    enviarMensagem
  };
})();
