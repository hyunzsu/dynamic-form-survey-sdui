/**
 * 액션 타입 정의
 */
export type ActionType =
  | ModalActionType
  | FormActionType
  | StepActionType
  | NavigationActionType;

export type ModalActionType =
  | 'openModal'
  | 'closeModal'
  | 'closeAllModal'
  | 'getModalState';

export type FormActionType =
  | 'setValue'
  | 'getValue'
  | 'setError'
  | 'clearErrors'
  | 'reset'
  | 'submit'
  | 'validate';

export type StepActionType = 'goPrevStep' | 'goNextStep' | 'getCurrentStep';

export type NavigationActionType = 'navigate' | 'goBack';
