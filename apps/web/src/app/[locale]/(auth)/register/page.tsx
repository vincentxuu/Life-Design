'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('auth');

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // 模擬註冊
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // 註冊成功後重定向到 onboarding
    window.location.href = `/${locale}/onboarding`;
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="heading-md text-basic-black">{t('createAccount')}</h2>
      </div>

      {/* OAuth buttons */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full" type="button">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {t('loginWithGoogle')}
        </Button>

        <Button variant="outline" className="w-full" type="button">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          {t('loginWithApple')}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-basic-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-basic-400">{t('orUseEmail')}</span>
        </div>
      </div>

      {/* Register form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="姓名"
          placeholder="你的名字"
          required
        />
        <Input
          type="email"
          label={t('email')}
          placeholder="your@email.com"
          required
        />
        <Input
          type="password"
          label={t('password')}
          placeholder="••••••••"
          helperText="至少 8 個字元"
          required
        />
        <Input
          type="password"
          label={t('confirmPassword')}
          placeholder="••••••••"
          required
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {t('register')}
        </Button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-basic-500">
        {t('hasAccount')}{' '}
        <Link
          href={`/${locale}/login`}
          className="font-medium text-primary-base hover:underline"
        >
          {t('loginNow')}
        </Link>
      </p>
    </div>
  );
}
