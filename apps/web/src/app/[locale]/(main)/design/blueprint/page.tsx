'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
  BlueprintTabs,
  BlueprintForm,
  VersionComparison,
  blueprintVersions,
  type BlueprintVersionId,
} from '@/components/blueprint';
import { mockBlueprint } from '@/mocks';
import type { BlueprintVersion } from '@/types';
import { Save, BarChart3 } from 'lucide-react';

export default function BlueprintPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('blueprint');

  const [activeTab, setActiveTab] = React.useState<BlueprintVersionId>('a');
  const [showComparison, setShowComparison] = React.useState(false);
  const [versions, setVersions] = React.useState<Record<BlueprintVersionId, BlueprintVersion>>({
    a: mockBlueprint.versions.a,
    b: mockBlueprint.versions.b,
    c: mockBlueprint.versions.c,
  });

  const handleVersionChange = (version: BlueprintVersion) => {
    setVersions((prev) => ({ ...prev, [activeTab]: version }));
  };

  const handleSave = () => {
    console.log('Saving blueprint:', versions);
    // Mock save
  };

  const activeVersionInfo = blueprintVersions.find((v) => v.id === activeTab)!;

  return (
    <div>
      <PageHeader
        title={t('title')}
        description="設計三種不同版本的人生藍圖"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              {showComparison ? '編輯模式' : t('compare')}
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              儲存
            </Button>
          </div>
        }
      />

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Tabs */}
        <BlueprintTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        {showComparison ? (
          <VersionComparison versions={versions} />
        ) : (
          <>
            {/* Version Info Banner */}
            <div
              className={`rounded-xl p-4 ${activeVersionInfo.bgColor} ${activeVersionInfo.color}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {activeTab === 'a' ? '📊' : activeTab === 'b' ? '🔄' : '✨'}
                </span>
                <div>
                  <h3 className="font-semibold">{activeVersionInfo.label}</h3>
                  <p className="text-sm opacity-80">
                    {activeTab === 'a' && '延續現況的最佳發展路徑'}
                    {activeTab === 'b' && '如果現況不可行，這是你的 B 計劃'}
                    {activeTab === 'c' && '如果沒有任何限制，你最想過的生活'}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <BlueprintForm
              version={versions[activeTab]}
              onChange={handleVersionChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
