import LifeCharacterAssessment from '@/components/LifeCharacterAssessment';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="container mx-auto px-4">
        <LifeCharacterAssessment />
      </div>
    </LanguageProvider>
  );
}
