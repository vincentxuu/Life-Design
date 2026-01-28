import { redirect } from 'next/navigation';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // 重定向到 dashboard
  redirect(`/${locale}/dashboard`);
}
