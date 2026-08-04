export const contactConfig = {
  whatsapp: {
    // Apenas os números, sem espaços ou símbolos
    phoneNumber: '5511999999999', 
    
    // O link base da API do WhatsApp
    baseUrl: 'https://api.whatsapp.com/send',
    
    // Mensagem padrão que será enviada
    defaultMessage: 'Olá, vim pelo site!',

    /**
     * Helper method to generate the full WhatsApp link
     */
    getLink(customMessage?: string): string {
      const msg = customMessage || this.defaultMessage;
      return `${this.baseUrl}?phone=${this.phoneNumber}&text=${encodeURIComponent(msg)}`;
    }
  },
  
  social: {
    instagram: 'https://www.instagram.com/imob.larmais/'
  }
};
