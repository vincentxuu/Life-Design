'use client';

import * as React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { MobileTabBar } from './mobile-tab-bar';
import { cn } from '@/lib/utils';

export interface AppShellProps {
  children: React.ReactNode;
  locale: string;
  user?: {
    name: string;
    avatar?: string;
  };
  className?: string;
}

export function AppShell({ children, locale, user, className }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={cn('min-h-screen bg-basic-100', className)}>
      {/* Header */}
      <Header
        user={user}
        onMenuToggle={toggleSidebar}
        isMenuOpen={isSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar
        locale={locale}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <main
        className={cn(
          'min-h-[calc(100vh-4rem)] pt-0 transition-all duration-300',
          'md:ml-60', // Sidebar width
          'pb-20 md:pb-0' // Bottom padding for mobile tab bar
        )}
      >
        <div className="mx-auto max-w-5xl p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Tab Bar */}
      <MobileTabBar locale={locale} />
    </div>
  );
}
