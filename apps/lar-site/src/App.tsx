import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import { NotFound } from './pages/NotFound'
import WhatsAppFloat from './components/WhatsAppFloat'
import { usePlatformConfig } from './hooks/usePlatformConfig'

function App() {
  const { isLoading, settings, content } = usePlatformConfig();

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div></div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout content={content} settings={settings} />}>
          <Route index element={<HomePage content={content} settings={settings} />} />
          <Route path="imoveis" element={<PropertiesPage settings={settings} />} />
          <Route path="imoveis/:slug" element={<PropertyDetailPage settings={settings} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {content?.floatingCta?.whatsappActive && (
        <WhatsAppFloat message={content.floatingCta.whatsappMessage} phone={settings?.contact.whatsapp} />
      )}
    </>
  )
}

export default App
