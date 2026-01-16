export type Screen =
  | 'Welcome'
  | 'SignIn'
  | 'SignUp'
  | 'Onboarding'
  | 'WelcomeAnimation'
  | 'Home'
  | 'Record'
  | 'Calendar'
  | 'Edit';

export type Navigation = {
  navigate: (screen: Screen, params?: any) => void;
  goBack: () => void;
};
