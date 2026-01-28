'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Bell,
  Moon,
  Globe,
  Shield,
  Download,
  HelpCircle,
  FileText,
  Lock,
  LogOut,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockUser } from '@/mocks';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

function SettingItem({ icon, label, value, onClick, variant = 'default' }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between px-4 py-3 text-left transition-colors',
        'hover:bg-basic-100',
        variant === 'danger' && 'text-destructive hover:bg-red-50'
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn('text-basic-400', variant === 'danger' && 'text-destructive')}>
          {icon}
        </span>
        <span className={cn('font-medium', variant === 'danger' ? 'text-destructive' : 'text-basic-600')}>
          {label}
        </span>
      </div>
      {value ? (
        <span className="text-sm text-basic-400">{value}</span>
      ) : (
        <ChevronRight className="h-4 w-4 text-basic-300" />
      )}
    </button>
  );
}

export default function SettingsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('settings');

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <div>
      <PageHeader title={t('title')} />

      <div className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Avatar size="xl">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-basic-600">{mockUser.name}</h3>
              <p className="text-sm text-basic-400">{mockUser.email}</p>
            </div>
            <Button variant="ghost" size="sm">
              {t('editProfile')} →
            </Button>
          </CardContent>
        </Card>

        {/* Settings List */}
        <Card padding="none">
          <div className="divide-y divide-basic-200">
            <SettingItem
              icon={<Bell className="h-5 w-5" />}
              label={t('notifications')}
            />
            <SettingItem
              icon={<Moon className="h-5 w-5" />}
              label={t('darkMode')}
              value={
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={cn(
                    'relative h-6 w-11 rounded-full transition-colors',
                    isDarkMode ? 'bg-primary-base' : 'bg-basic-300'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform',
                      isDarkMode ? 'left-6' : 'left-1'
                    )}
                  />
                </button>
              }
            />
            <SettingItem
              icon={<Globe className="h-5 w-5" />}
              label={t('language')}
              value="繁體中文"
            />
            <SettingItem
              icon={<Shield className="h-5 w-5" />}
              label={t('privacy')}
            />
            <SettingItem
              icon={<Download className="h-5 w-5" />}
              label={t('exportData')}
            />
          </div>
        </Card>

        {/* Help & Legal */}
        <Card padding="none">
          <div className="divide-y divide-basic-200">
            <SettingItem
              icon={<HelpCircle className="h-5 w-5" />}
              label={t('helpCenter')}
            />
            <SettingItem
              icon={<FileText className="h-5 w-5" />}
              label={t('terms')}
            />
            <SettingItem
              icon={<Lock className="h-5 w-5" />}
              label={t('privacyPolicy')}
            />
          </div>
        </Card>

        {/* Danger Zone */}
        <Card padding="none">
          <div className="divide-y divide-basic-200">
            <SettingItem
              icon={<LogOut className="h-5 w-5" />}
              label={t('logout')}
              variant="danger"
            />
            <SettingItem
              icon={<Trash2 className="h-5 w-5" />}
              label={t('deleteAccount')}
              variant="danger"
            />
          </div>
        </Card>

        {/* Version */}
        <p className="text-center text-sm text-basic-400">
          {t('version')} 1.0.0
        </p>
      </div>
    </div>
  );
}
