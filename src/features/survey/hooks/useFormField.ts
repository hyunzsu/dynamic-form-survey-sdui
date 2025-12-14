import { useFormContext } from 'react-hook-form';

/**
 * 폼 필드 훅
 * - register, value, error를 한번에 반환
 */
export function useFormField(name: string) {
  const { register, watch, setValue, formState } = useFormContext();

  const error = formState.errors[name]?.message as string | undefined;

  return {
    register: register(name),
    value: watch(name),
    setValue: (value: unknown) => setValue(name, value),
    error,
  };
}
