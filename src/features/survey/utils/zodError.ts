interface ZodErrorObject {
  message: string;
  type?: string;
  ref?: unknown;
}

const isZodErrorObject = (error: unknown): error is ZodErrorObject => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ZodErrorObject).message === 'string'
  );
};

/**
 * 중첩된 에러 객체에서 첫 번째 Zod 에러 메시지를 찾음
 */
const findFirstZodError = (obj: unknown): string | null => {
  // null이거나 undefined인 경우
  if (obj == null) {
    return null;
  }

  // ZodError 객체인 경우
  if (isZodErrorObject(obj)) {
    return obj.message;
  }

  // 배열인 경우
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const message = findFirstZodError(item);
      if (message) {
        return message;
      }
    }
    return null;
  }

  // 객체인 경우
  if (typeof obj === 'object') {
    for (const value of Object.values(obj)) {
      const message = findFirstZodError(value);
      if (message) {
        return message;
      }
    }
  }

  return null;
};

/**
 * Zod 에러 객체에서 첫 번째 에러 메시지 반환
 */
export const getZodErrorMessage = (errors: unknown): string => {
  return findFirstZodError(errors) ?? '';
};
