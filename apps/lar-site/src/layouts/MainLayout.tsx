import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { PlatformContent, PlatformSettings } from '@lar/shared'

interface MainLayoutProps {
  content?: PlatformContent | null;
  settings?: PlatformSettings | null;
}

/**
 * Main layout wrapping all pages — Navbar on top, Footer at bottom
 */
export default function MainLayout({ content, settings }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar settings={settings} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer content={content} settings={settings} />
    </div>
  )
}
