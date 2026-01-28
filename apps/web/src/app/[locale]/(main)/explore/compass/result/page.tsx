'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { CompassVisualization, CompassAnalysis } from '@/components/compass';
import { mockCompassData } from '@/mocks';
import { Share2, ArrowRight, ChevronLeft } from 'lucide-react';

export default function CompassResultPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('compass');

  const { analysis } = mockCompassData;

  const handleBack = () => {
    router.push(`/${locale}/explore/compass`);
  };

  const handleContinueToBlueprint = () => {
    router.push(`/${locale}/design/blueprint`);
  };

  const handleShare = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Ikigai Compass Result',
        text: `My Ikigai score is ${analysis?.ikigaiScore}%!`,
        url: window.location.href,
      });
    }
  };

  if (!analysis) {
    return <div>Loading...</div>;
  }

  const scores = analysis.dimensionScores;
  const keywords = {
    passion: mockCompassData.passion.keywords,
    mission: mockCompassData.mission.keywords,
    profession: mockCompassData.profession.keywords,
    vocation: mockCompassData.vocation.keywords,
  };

  return (
    <div>
      <PageHeader
        title="你的意義羅盤分析結果"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              返回
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              {t('shareResult')}
            </Button>
          </div>
        }
      />

      <div className="mx-auto max-w-4xl">
        {/* Visualization */}
        <div className="mb-8 flex justify-center">
          <CompassVisualization
            scores={scores}
            size={350}
            showLabels={true}
            animated={true}
          />
        </div>

        {/* Analysis Cards */}
        <CompassAnalysis
          scores={scores}
          keywords={keywords}
          coreIntersection={analysis.coreIntersection}
          suggestions={analysis.suggestions}
        />

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={handleContinueToBlueprint}>
            {t('continueToBlueprint')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
