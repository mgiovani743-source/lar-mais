import type { Property, Testimonial, FAQItem, Step, Stat } from '@/types'

// ============================================================
// WHATSAPP
// ============================================================
export const WHATSAPP_NUMBER = '5551999999999'
export const WHATSAPP_MESSAGE = encodeURIComponent('Olá, vim pelo site!')
export const WHATSAPP_URL = `https://api.whatsapp.com/message/AO2ZV2YU3Y3YG1?autoload=1&app_absent=0&utm_source=ig&text=${WHATSAPP_MESSAGE}`
export const INSTAGRAM_URL = 'https://www.instagram.com/imob.larmais/'

// ============================================================
// NAVIGATION
// ============================================================
export const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Imóveis', href: '#imoveis' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
]

// ============================================================
// STATS
// ============================================================
export const STATS: Stat[] = [
  { id: '1', value: '+500', label: 'Famílias atendidas' },
  { id: '2', value: 'R$0', label: 'Para simular' },
  { id: '3', value: '100%', label: 'Gratuito' },
  { id: '4', value: 'FGTS', label: 'Aceito' },
]

// ============================================================
// HOW IT WORKS
// ============================================================
export const STEPS: Step[] = [
  {
    id: '1',
    number: 1,
    title: 'Simulação Gratuita',
    description: 'Fazemos uma simulação completa sem custo. Analisamos renda, FGTS e as melhores condições para você.',
    icon: 'calculator',
  },
  {
    id: '2',
    number: 2,
    title: 'Escolha do Imóvel',
    description: 'Apresentamos imóveis selecionados em Porto Alegre que se encaixam perfeitamente no seu perfil.',
    icon: 'home',
  },
  {
    id: '3',
    number: 3,
    title: 'Aprovação do Crédito',
    description: 'Nossa equipe cuida de toda a documentação e acompanha o processo de aprovação junto à Caixa Econômica.',
    icon: 'check-circle',
  },
  {
    id: '4',
    number: 4,
    title: 'Assinatura do Contrato',
    description: 'Com a aprovação em mãos, você assina o contrato de financiamento com total segurança e clareza.',
    icon: 'file-text',
  },
  {
    id: '5',
    number: 5,
    title: 'Entrega das Chaves',
    description: 'O momento mais emocionante! Receba as chaves do seu novo apartamento e realize seu sonho.',
    icon: 'key',
  },
]

// ============================================================
// BENEFITS
// ============================================================
export const BENEFITS = [
  {
    id: '1',
    icon: 'trending-down',
    title: 'Entrada Facilitada',
    description: 'Condições especiais de entrada com uso do FGTS como parte do pagamento inicial.',
    color: 'primary',
  },
  {
    id: '2',
    icon: 'credit-card',
    title: 'Parcelas Acessíveis',
    description: 'Financiamento com subsídio do governo. Parcelas que cabem no seu orçamento.',
    color: 'secondary',
  },
  {
    id: '3',
    icon: 'shield-check',
    title: 'Uso do FGTS',
    description: 'Utilize seu FGTS para reduzir o valor do imóvel ou abater nas parcelas mensais.',
    color: 'primary',
  },
  {
    id: '4',
    icon: 'users',
    title: 'Atendimento Personalizado',
    description: 'Um especialista dedicado acompanha você em cada etapa do processo, do início ao fim.',
    color: 'secondary',
  },
  {
    id: '5',
    icon: 'zap',
    title: 'Processo Simplificado',
    description: 'Sem burocracia desnecessária. Cuidamos de toda a documentação por você.',
    color: 'primary',
  },
  {
    id: '6',
    icon: 'building-2',
    title: 'Imóveis Novos',
    description: 'Apartamentos novos, modernos, com garantia construtora e infraestrutura completa.',
    color: 'secondary',
  },
]

// ============================================================
// PROPERTIES
// ============================================================
export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Residencial Vista Verde',
    neighborhood: 'Restinga',
    city: 'Porto Alegre',
    price: 189000,
    bedrooms: 2,
    area: 48,
    bathrooms: 1,
    parking: 1,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    badge: 'Novo',
    badgeColor: 'primary',
    isNew: true,
  },
  {
    id: '2',
    name: 'Parque das Flores',
    neighborhood: 'Cavalhada',
    city: 'Porto Alegre',
    price: 215000,
    bedrooms: 2,
    area: 52,
    bathrooms: 1,
    parking: 1,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    badge: 'Alta Demanda',
    badgeColor: 'accent',
  },
  {
    id: '3',
    name: 'Residencial Ipanema',
    neighborhood: 'Ipanema',
    city: 'Porto Alegre',
    price: 235000,
    bedrooms: 3,
    area: 65,
    bathrooms: 2,
    parking: 1,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    badge: 'Últimas Unidades',
    badgeColor: 'accent',
  },
  {
    id: '4',
    name: 'Jardins do Sul',
    neighborhood: 'Hípica',
    city: 'Porto Alegre',
    price: 198000,
    bedrooms: 2,
    area: 50,
    bathrooms: 1,
    parking: 1,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    badge: 'Novo',
    badgeColor: 'primary',
    isNew: true,
  },
  {
    id: '5',
    name: 'Reserva Belém Novo',
    neighborhood: 'Belém Novo',
    city: 'Porto Alegre',
    price: 175000,
    bedrooms: 2,
    area: 44,
    bathrooms: 1,
    parking: 1,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    badgeColor: 'secondary',
  },
  {
    id: '6',
    name: 'Portal do Camaquã',
    neighborhood: 'Camaquã',
    city: 'Porto Alegre',
    price: 222000,
    bedrooms: 2,
    area: 55,
    bathrooms: 1,
    parking: 1,
    imageUrl: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&q=80',
    badge: 'Subsídio Máximo',
    badgeColor: 'secondary',
  },
]

// ============================================================
// TESTIMONIALS
// ============================================================
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Carolina S.',
    role: 'Professora',
    neighborhood: 'Restinga',
    content: 'Nunca imaginei que seria tão fácil! A equipe da Lar+ me acompanhou em cada passo. Em menos de 4 meses já estava com as chaves na mão. Foi um sonho realizado!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=200&q=80',
  },
  {
    id: '2',
    name: 'Roberto M.',
    role: 'Motorista de App',
    neighborhood: 'Cavalhada',
    content: 'Achei que nunca conseguiria financiar um apartamento com minha renda. A Lar+ me mostrou que era possível, usou meu FGTS e hoje pago uma parcela menor do que pagava de aluguel!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: '3',
    name: 'Juliana e Carlos F.',
    role: 'Casal',
    neighborhood: 'Ipanema',
    content: 'Atendimento excepcional! Eles cuidaram de tudo para nós: documentação, banco, cartório. A gente só apareceu para assinar. Simplesmente incrível!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&q=80',
  },
  {
    id: '4',
    name: 'Marcos A.',
    role: 'Operador de Máquinas',
    neighborhood: 'Hípica',
    content: 'A Lar+ foi transparente do início ao fim. Me explicaram cada detalhe do contrato sem pressa. Processo sem estresse, sem surpresas. Recomendo de olhos fechados!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    id: '5',
    name: 'Fernanda L.',
    role: 'Auxiliar Administrativa',
    neighborhood: 'Camaquã',
    content: 'Mãe solo, sem marido, achei que era impossível. A equipe da Lar+ não só acreditou em mim como me ajudou a conseguir o subsídio máximo. Que empresa incrível!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
]

// ============================================================
// FAQ
// ============================================================
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'Quem pode participar do Minha Casa Minha Vida?',
    answer: 'Famílias com renda bruta mensal de até R$ 8.000 podem participar do programa. O benefício varia conforme a faixa de renda: Faixa 1 (até R$2.640), Faixa 2 (R$2.640 a R$4.400) e Faixa 3 (R$4.400 a R$8.000). Não é necessário ter comprovante de renda formal — trabalhadores autônomos e informais também podem participar.',
  },
  {
    id: '2',
    question: 'Posso usar meu FGTS para comprar o apartamento?',
    answer: 'Sim! O FGTS pode ser utilizado como entrada no financiamento habitacional, para amortizar o saldo devedor ou abater nas prestações mensais. Para isso, é necessário ter pelo menos 3 anos de trabalho sob regime do FGTS (não necessariamente consecutivos) e não possuir outro imóvel residencial no mesmo município.',
  },
  {
    id: '3',
    question: 'Qual é a renda mínima para financiar?',
    answer: 'Não existe uma renda mínima fixa — o que importa é a capacidade de pagamento. Em geral, a parcela do financiamento não pode ultrapassar 30% da renda familiar bruta. A Lar+ faz uma simulação gratuita e personalizada para encontrar a melhor condição para o seu perfil de renda.',
  },
  {
    id: '4',
    question: 'Preciso dar entrada para comprar meu apartamento?',
    answer: 'Depende do seu perfil. Nas faixas de menor renda do MCMV, o governo oferece subsídios que podem cobrir parte expressiva do imóvel, reduzindo ou até eliminando a necessidade de entrada própria. Além disso, o FGTS pode complementar esse valor. Faça sua simulação gratuita para saber exatamente o que se aplica ao seu caso.',
  },
  {
    id: '5',
    question: 'Quanto tempo leva o processo até receber as chaves?',
    answer: 'O processo completo, desde a simulação até a entrega das chaves, geralmente leva entre 60 a 120 dias, dependendo da documentação e da análise do banco. Nossa equipe agiliza ao máximo esse processo cuidando de toda a burocracia por você. Para imóveis prontos para morar, o prazo é ainda menor!',
  },
  {
    id: '6',
    question: 'A simulação realmente é gratuita?',
    answer: 'Sim, 100% gratuita e sem compromisso! Você não paga nada para simular. Nossa simulação analisa sua renda, FGTS disponível, subsídios aplicáveis e calcula as parcelas reais do financiamento. Só decidimos avançar juntos quando você estiver completamente seguro e satisfeito com as condições.',
  },
]

// ============================================================
// DIFFERENTIALS
// ============================================================
export const DIFFERENTIALS = [
  {
    id: '1',
    icon: 'heart-handshake',
    title: 'Atendimento Humanizado',
    description: 'Você é tratado como pessoa, não como número. Nossa equipe cuida de você do início ao fim.',
  },
  {
    id: '2',
    icon: 'award',
    title: 'Especialistas em MCMV',
    description: 'Somos 100% focados no Minha Casa Minha Vida. Nenhuma outra imobiliária de Porto Alegre conhece mais esse programa.',
  },
  {
    id: '3',
    icon: 'map-pin',
    title: 'Foco em Porto Alegre',
    description: 'Conhecemos cada bairro, cada oportunidade e cada empreendimento novo que surge na cidade.',
  },
  {
    id: '4',
    icon: 'headphones',
    title: 'Suporte Completo',
    description: 'Da documentação ao cartório, cuidamos de tudo. Você só precisa sonhar — a gente faz o resto.',
  },
]
