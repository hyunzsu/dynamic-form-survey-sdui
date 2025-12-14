import { useState, useEffect } from 'react';
import type { SurveyDocument } from '../types';

interface UseLocalJsonDataResult {
  /** 전체 문서 데이터 */
  document: SurveyDocument | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * 로컬 JSON 데이터 로드 훅
 * - public/json/*.json 파일을 동적으로 로드
 * - 전체 document를 반환하여 PageRenderer에서 items 순회
 */
export function useLocalJsonData(jsonPath: string): UseLocalJsonDataResult {
  const [document, setDocument] = useState<SurveyDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(jsonPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data: SurveyDocument = await response.json();

        if (!data?.body?.items) {
          throw new Error('Invalid survey JSON structure');
        }

        setDocument(data);
      } catch (err) {
        console.error('Failed to load survey data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jsonPath]);

  return { document, isLoading, error };
}
