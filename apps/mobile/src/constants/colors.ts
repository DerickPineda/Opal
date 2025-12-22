// This file is used as a library of colors we can use throughout the application
// The way they are used:
/*
 * Tailwind classes
 * <View className="bg-opal-light">
 * <Text className="text-opal-darkest">Hello</Text>
 * </View>
 *
 * Component props
 * <LightPillar
 *   topColor={colors.opal.light}
 *   bottomColor={colors.opal.darkest}
 * />
 */
export const colors = {
  opal: {
    light: '#a5bfb6',
    DEFAULT: '#90aaa1',
    dark: '#6b8077',
    darker: '#29342e',
    darkest: '#171916',
  },
} as const;
