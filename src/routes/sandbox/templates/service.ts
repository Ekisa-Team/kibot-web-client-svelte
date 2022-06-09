import type { Template, TemplatePayload } from '$lib/models/app/template';
import { http } from '$lib/services/http';
import { variables } from '$lib/variables';

const BASE_URL = variables.kibotCoreApiUrl;

//#region http services
const fetchTemplates = async (chatbotId: number) =>
  await http.get<Template[]>(`${BASE_URL}/chatbots/${chatbotId}/templates`);

const sendTemplate = async (chatbotId: number, templateId: number, payload: TemplatePayload) =>
  await http.post(`${BASE_URL}/chatbots/${chatbotId}/templates/${templateId}/send`, payload);
//#endregion

//#region helper methods
const extractParameterAsID = (parameter: string, prefix: string) =>
  prefix + parameter.replace('{{', '').replace('}}', '');

const extractParameters = (templateMessage: string): { parameters: string[]; dynamicText: string } => {
  const parameters: string[] = [];

  const dynamicText = templateMessage.replace(/{{.}}/g, (match) => {
    parameters.push(match);
    const id = extractParameterAsID(match, 'p');
    return `<span id="${id}">${match}</span>`;
  });

  return { parameters, dynamicText };
};
//#endregion

export const templatesService = { fetchTemplates, sendTemplate, extractParameterAsID, extractParameters };
