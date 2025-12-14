import type { ComponentType } from 'react';
import {
  // Layout
  Container,
  Text,
  ProgressBar,
  StepIndicator,
  // Form
  SurveyForm,
  // Inputs
  SingleChoice,
  MultipleChoice,
  TextInput,
  Rating,
  // Actions
  Button,
  PrevButton,
  NextButton,
  SubmitButton,
  CompletePage,
} from '../elements';

// 각 컴포넌트의 props 타입이 다르므로 any 허용
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentMap = Record<string, ComponentType<any>>;

/**
 * role에 따른 컴포넌트 매핑
 */
export const COMPONENT_MAP: ComponentMap = {
  // Layout
  container: Container,
  text: Text,
  progressBar: ProgressBar,
  stepIndicator: StepIndicator,

  // Form (Survey)
  surveyForm: SurveyForm,

  // Form Inputs
  singleChoice: SingleChoice,
  multipleChoice: MultipleChoice,
  textInput: TextInput,
  rating: Rating,

  // Actions
  button: Button,
  prevButton: PrevButton,
  nextButton: NextButton,
  submitButton: SubmitButton,
  completePage: CompletePage,
};
