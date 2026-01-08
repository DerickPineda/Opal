export type Screen =
  | 'Welcome'
  | 'SignIn'
  | 'SignUp'
  | 'Onboarding'
  | 'WelcomeAnimation'
  | 'Home'
  | 'Record'
  | 'Calendar';

export type Navigation = {
  navigate: (screen: Screen) => void;
  goBack: () => void;
};
