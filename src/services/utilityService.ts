import { API_URL } from './apiConfig';

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};

// Add translation service
export async function translateText(texts: string[], targetLanguage: string): Promise<string[]> {
  try {
    console.log(`Translating ${texts.length} texts to ${targetLanguage}`);
    
    // This would normally call a real translation API
    // For demo purposes, we're simulating the translation with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple demo translations for a few languages
        // In a real implementation, this would call Google Translate, DeepL, or another translation API
        const demoTranslations: Record<string, Record<string, string>> = {
          "es": {
            "Policy Analysis Visualization": "Visualización del Análisis de Pólizas",
            "Visual breakdown of your policy analysis results": "Desglose visual de los resultados del análisis de su póliza",
            "Coverage Gaps": "Brechas de Cobertura",
            "Your policy has potential coverage gaps in personal property protection.": "Su póliza tiene posibles brechas de cobertura en la protección de propiedad personal.",
            "Premium Assessment": "Evaluación de Prima",
            "Your premium is within the expected range for your coverage level.": "Su prima está dentro del rango esperado para su nivel de cobertura.",
            "Recommendations": "Recomendaciones",
            "Consider increasing liability coverage for better protection.": "Considere aumentar la cobertura de responsabilidad para una mejor protección."
          },
          "fr": {
            "Policy Analysis Visualization": "Visualisation de l'Analyse de Police",
            "Visual breakdown of your policy analysis results": "Répartition visuelle des résultats de l'analyse de votre police",
            "Coverage Gaps": "Lacunes de Couverture",
            "Your policy has potential coverage gaps in personal property protection.": "Votre police présente des lacunes potentielles en matière de protection des biens personnels.",
            "Premium Assessment": "Évaluation de la Prime",
            "Your premium is within the expected range for your coverage level.": "Votre prime se situe dans la fourchette prévue pour votre niveau de couverture.",
            "Recommendations": "Recommandations",
            "Consider increasing liability coverage for better protection.": "Envisagez d'augmenter la couverture de responsabilité pour une meilleure protection."
          },
          "de": {
            "Policy Analysis Visualization": "Visualisierung der Policenanalyse",
            "Visual breakdown of your policy analysis results": "Visuelle Aufschlüsselung Ihrer Policenanalyseergebnisse",
            "Coverage Gaps": "Deckungslücken",
            "Your policy has potential coverage gaps in personal property protection.": "Ihre Police hat potenzielle Deckungslücken im Bereich des persönlichen Eigentumschutzes.",
            "Premium Assessment": "Prämienbewertung",
            "Your premium is within the expected range for your coverage level.": "Ihre Prämie liegt im erwarteten Bereich für Ihr Deckungsniveau.",
            "Recommendations": "Empfehlungen",
            "Consider increasing liability coverage for better protection.": "Erwägen Sie eine Erhöhung des Haftpflichtschutzes für einen besseren Schutz."
          }
        };

        // Translate each text
        const translatedTexts = texts.map(text => {
          // Check if we have a demo translation for this language and text
          if (demoTranslations[targetLanguage] && demoTranslations[targetLanguage][text]) {
            return demoTranslations[targetLanguage][text];
          }
          // Otherwise add a prefix to show it's been "translated"
          return `[${targetLanguage}] ${text}`;
        });

        resolve(translatedTexts);
      }, 1500); // Simulate API delay
    });
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}
