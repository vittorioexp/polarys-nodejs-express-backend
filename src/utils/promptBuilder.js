// File: utils/promptBuilder.js

const buildPrompt = (input) => {
  // Costruisce un prompt LLM basato sui dati di input
  const { country, domain, proposals, constraints } = input;

  const prompt = `
      Si richiede una simulazione politica per il paese: ${country} nel dominio: ${domain}.
      Proposte: ${proposals.join(", ")}.
      Vincoli: ${constraints.join(", ")}.
    `;

  return prompt;
};

module.exports = { buildPrompt };
