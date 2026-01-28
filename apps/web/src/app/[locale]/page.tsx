import { redirect } from 'next/navigation';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // 重定向到 dashboard
  redirect(`/${locale}/dashboard`);
}
