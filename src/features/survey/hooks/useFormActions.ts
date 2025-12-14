import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getZodErrorMessage } from '../utils';

interface FormActions {
  /** 필드 값 설정 */
  setValue: (name: string, value: unknown) => void;
  /** 필드 값 조회 */
  getValue: (name: string) => unknown;
  /** 에러 설정 */
  setError: (name: string, message: string) => void;
  /** 에러 초기화 */
  clearErrors: (name?: string) => void;
  /** 폼 리셋 */
  reset: () => void;
  /** 폼 제출 */
  submit: (onSuccess?: (data: Record<string, unknown>) => void) => void;
  /** 유효성 검사 */
  validate: (name?: string) => Promise<boolean>;
}

const DEFAULT_FORM_ACTIONS: FormActions = {
  setValue: () => {},
  getValue: () => undefined,
  setError: () => {},
  clearErrors: () => {},
  reset: () => {},
  submit: () => {},
  validate: async () => false,
};

/**
 * 폼 액션 훅
 * - FormContext에서 폼 조작 함수 제공
 */
export function useFormActions(): FormActions {
  const context = useFormContext<Record<string, unknown>>();

  const handleSubmit = useCallback(
    (onSuccess?: (data: Record<string, unknown>) => void) => {
      if (!context) return;

      context.handleSubmit(
        // onValid
        (data) => {
          console.log('Form submitted:', data);
          toast.success('설문이 제출되었습니다!');
          onSuccess?.(data);
        },
        // onInvalid
        (errors) => {
          const message = getZodErrorMessage(errors);
          toast.error(message || '입력 내용을 확인해주세요.');
          console.warn('Validation failed:', errors);
        }
      )();
    },
    [context]
  );

  if (!context) return DEFAULT_FORM_ACTIONS;

  const { setValue, getValues, setError, clearErrors, reset, trigger } =
    context;

  return {
    setValue: (name: string, value: unknown) => {
      setValue(name, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    getValue: (name: string) => getValues(name),
    setError: (name: string, message: string) => {
      setError(name, { type: 'manual', message });
    },
    clearErrors: (name?: string) => clearErrors(name),
    reset: () => reset(),
    submit: handleSubmit,
    validate: async (name?: string) => {
      return trigger(name);
    },
  };
}
