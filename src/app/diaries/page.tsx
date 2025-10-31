import Diaries from '@/commons/components/diaries';
import MockDataSetup from '@/commons/utils/setup-mock-data';

export default function DiariesPage() {
  return (
    <div data-testid="diaries-page">
      <MockDataSetup />
      <Diaries />
    </div>
  );
}

