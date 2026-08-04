import { ApiPropertyRepository, PropertyAppService } from '@lar/shared';

// Aqui criamos nossa Composition Root (Raiz de Composição).
// O lar-site não precisa saber como instanciar o repositório ou qual é a URL base.
// As páginas devem importar apenas a instância configurada do service daqui.

const propertyRepository = new ApiPropertyRepository('http://localhost:3333/properties');
export const propertyService = new PropertyAppService(propertyRepository);
