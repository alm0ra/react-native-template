# Claude Code Guide for Gluestack UI Expo App

This document provides guidance for working with this Expo mobile application template built with Gluestack UI, React Native, and NativeWind.

## Project Overview

This is a production-ready Expo application template featuring:
- **Framework**: Expo 51 with Expo Router for file-based routing
- **UI Library**: Gluestack UI v1.x (component system)
- **Styling**: NativeWind 4.x (Tailwind CSS for React Native)
- **Form Management**: React Hook Form with Zod validation
- **Navigation**: Expo Router with typed routes
- **Platforms**: iOS, Android, and Web support

## Project Structure

```
expo-app/
├── app/                      # Expo Router pages (file-based routing)
│   ├── _layout.tsx          # Root layout with providers
│   ├── index.tsx            # Home/landing page
│   ├── auth/                # Authentication screens
│   ├── dashboard/           # Dashboard screens
│   ├── news-feed/           # News feed screens
│   └── profile/             # Profile screens
├── components/
│   └── ui/                  # 52+ Gluestack UI components
│       ├── button/          # Button component with variants
│       ├── input/           # Input components
│       ├── form-control/    # Form elements
│       └── ...              # Other UI components
├── screens/                 # Screen implementations (imported by app/)
│   ├── auth/               # Auth screen logic
│   ├── dashboard/          # Dashboard screen logic
│   ├── news-feed/          # News feed screen logic
│   └── profile-screens/    # Profile screen logic
├── constants/              # App constants and configuration
├── assets/                 # Images, fonts, and static assets
├── tailwind.config.js      # Tailwind/NativeWind configuration
└── global.css             # Global CSS styles
```

## Architecture Patterns

### 1. Routing Pattern
- **File-based routing** using Expo Router
- Route files in `app/` directory import from `screens/`
- Example: `app/auth/signin.tsx` → imports → `screens/auth/signin/index.tsx`

### 2. Component Architecture
Gluestack UI components follow a compound component pattern:

```tsx
// Component with sub-components
<Button>
  <ButtonIcon as={Icon} />
  <ButtonText>Click me</ButtonText>
  <ButtonSpinner />
</Button>
```

### 3. Styling System
Uses **NativeWind** (Tailwind for React Native) with Gluestack plugin:

```tsx
// Tailwind classes directly on components
<VStack className="w-full h-full bg-background-0 p-4" space="md">
  <Heading className="text-center" size="3xl">Title</Heading>
</VStack>
```

### 4. Theme System
- **Dark/Light mode** support via `GluestackUIProvider`
- Color tokens defined in `tailwind.config.js` using CSS variables
- Semantic color scales: primary, secondary, error, success, warning, info
- Each color has shades from 0-950

### 5. Form Handling Pattern
Standard pattern using React Hook Form + Zod:

```tsx
// 1. Define schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// 2. Use form hook
const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});

// 3. Controller wrapper
<Controller
  name="email"
  control={control}
  render={({ field: { onChange, onBlur, value } }) => (
    <Input>
      <InputField
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
      />
    </Input>
  )}
/>
```

## Available UI Components

The template includes 52+ pre-built components in `components/ui/`:

### Layout Components
- `Box`, `Center`, `HStack`, `VStack` - Layout containers
- `SafeAreaView`, `ScrollView` - Safe area and scrolling
- `Card` - Card container with variants
- `Divider` - Visual separator

### Form Components
- `Input`, `InputField`, `InputSlot`, `InputIcon` - Text inputs
- `Textarea` - Multi-line input
- `Checkbox` - Checkboxes with indicator
- `Radio` - Radio buttons
- `Select` - Dropdown selection
- `Slider` - Range slider
- `Switch` - Toggle switch
- `FormControl` - Form field wrapper with label/error

### Interactive Components
- `Button`, `ButtonText`, `ButtonIcon` - Button with variants
- `Pressable` - Touchable component
- `Link`, `LinkText` - Navigation links
- `Fab` - Floating action button

### Feedback Components
- `Alert` - Alert messages
- `AlertDialog` - Confirmation dialogs
- `Toast` - Toast notifications
- `Modal` - Modal dialogs
- `Actionsheet` - Bottom sheet menus
- `Progress` - Progress indicators
- `Spinner` - Loading spinners
- `Skeleton` - Loading placeholders

### Display Components
- `Text`, `Heading` - Typography
- `Image` - Optimized images
- `Avatar` - User avatars
- `Badge` - Status badges
- `Icon` - Icon wrapper
- `Tooltip` - Hover tooltips
- `Popover` - Popover menus
- `Menu` - Dropdown menus
- `Accordion` - Collapsible content

## Key Configuration Files

### 1. `tailwind.config.js`
- Custom color system with semantic tokens
- Responsive breakpoints (xs, sm, md, lg, xl)
- Gluestack plugin integration
- Font configuration

### 2. `app.json`
- Expo app configuration
- Bundle identifiers for iOS/Android
- Splash screen and icon settings
- EAS build configuration

### 3. `tsconfig.json`
- Path aliases: `@/*` maps to project root
- Strict TypeScript mode enabled
- Expo TypeScript settings

### 4. `babel.config.js` / `metro.config.js`
- Module resolution configuration
- NativeWind compilation setup

## Development Patterns

### Creating New Screens

1. **Create screen component** in `screens/[feature]/`:
```tsx
// screens/my-feature/index.tsx
export const MyFeature = () => {
  return (
    <VStack className="flex-1 p-4">
      <Heading>My Feature</Heading>
    </VStack>
  );
};
```

2. **Create route** in `app/`:
```tsx
// app/my-feature.tsx
import { MyFeature } from "@/screens/my-feature";
export default MyFeature;
```

3. **Register route** in `app/_layout.tsx` if using Stack navigation:
```tsx
<Stack.Screen name="my-feature" />
```

### Using Gluestack Components

Always import from `@/components/ui/[component]`:
```tsx
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
```

### Component Variants

Gluestack components support variants for different styles:

```tsx
// Button variants
<Button variant="solid" size="md" action="primary">
  <ButtonText>Primary Solid</ButtonText>
</Button>

<Button variant="outline" action="secondary">
  <ButtonText>Secondary Outline</ButtonText>
</Button>

<Button variant="link" action="negative">
  <ButtonText>Error Link</ButtonText>
</Button>
```

Common variant props:
- `variant`: solid, outline, link
- `size`: xs, sm, md, lg, xl
- `action`: primary, secondary, positive, negative

### Responsive Design

Use Tailwind responsive prefixes:
```tsx
<VStack className="w-full md:w-1/2 p-4 md:p-8">
  <Heading className="text-xl md:text-3xl">
    Responsive Title
  </Heading>
</VStack>
```

Breakpoints: `base` (0px), `xs` (400px), `sm` (480px), `md` (768px), `lg` (992px), `xl` (1280px)

### Dark Mode

Dark mode is automatically handled by the theme system:
```tsx
// Colors automatically adjust based on mode
<View className="bg-background-0 text-typography-900">
  {/* Light: white bg, dark text */}
  {/* Dark: dark bg, light text */}
</View>
```

### Navigation

Use `@unitools/router` for programmatic navigation:
```tsx
import useRouter from "@unitools/router";

const MyComponent = () => {
  const router = useRouter();

  return (
    <Button onPress={() => router.push("/dashboard")}>
      <ButtonText>Go to Dashboard</ButtonText>
    </Button>
  );
};
```

Use `@unitools/link` for declarative links:
```tsx
import Link from "@unitools/link";
import { LinkText } from "@/components/ui/link";

<Link href="/profile">
  <LinkText>View Profile</LinkText>
</Link>
```

### Toast Notifications

```tsx
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";

const MyComponent = () => {
  const toast = useToast();

  const showToast = () => {
    toast.show({
      placement: "bottom right",
      render: ({ id }) => (
        <Toast nativeID={id} variant="accent" action="success">
          <ToastTitle>Success message!</ToastTitle>
        </Toast>
      ),
    });
  };

  return <Button onPress={showToast}>Show Toast</Button>;
};
```

## Best Practices

### 1. Component Usage
- Always use Gluestack UI components instead of raw React Native components
- Import components from `@/components/ui/` paths
- Use compound components (e.g., `Button` + `ButtonText`)
- Apply variants before custom className styling

### 2. Styling
- Use NativeWind/Tailwind classes for styling
- Leverage semantic color tokens (primary, success, error, etc.)
- Use responsive modifiers for adaptive layouts
- Avoid inline styles; prefer className approach

### 3. Forms
- Use React Hook Form + Zod for all forms
- Wrap inputs with `FormControl` for consistent error handling
- Use `Controller` component for controlled inputs
- Define validation schemas separately for reusability

### 4. Layout
- Use `SafeAreaView` as root container for screens
- Use `VStack` and `HStack` for vertical/horizontal layouts
- Add `space` prop instead of margin for consistent spacing
- Use responsive classes for tablet/desktop layouts

### 5. Performance
- Use `FlatList` or `VirtualizedList` for long lists
- Lazy load screens with Expo Router
- Optimize images with Expo Image component
- Memoize expensive computations

### 6. TypeScript
- Leverage typed routes from Expo Router
- Define proper types for component props
- Use Zod schemas for runtime type validation
- Enable strict mode for type safety

## Common Tasks

### Adding a New UI Component
1. Look for the component in `components/ui/`
2. Import the component and its sub-components
3. Check the component's index.tsx for available variants
4. Use TypeScript autocomplete for prop suggestions

### Creating a Form Screen
1. Define Zod schema for validation
2. Use `useForm` hook with `zodResolver`
3. Wrap fields with `FormControl` and `Controller`
4. Handle submission with `handleSubmit`
5. Display errors using `FormControlError`

### Implementing Authentication Flow
1. Create screens in `screens/auth/`
2. Add routes in `app/auth/`
3. Use `AuthLayout` for consistent styling
4. Implement form validation with Zod
5. Handle navigation with `useRouter`

### Customizing Theme Colors
1. Edit `tailwind.config.js` color definitions
2. Update CSS variables in `components/ui/gluestack-ui-provider/config.ts`
3. Use semantic color names in components
4. Colors auto-adapt for dark mode

### Adding Icons
Use Lucide React Native icons:
```tsx
import { CheckIcon, UserIcon } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";

<Icon as={CheckIcon} size="xl" />
```

Or use Expo vector icons:
```tsx
import { FontAwesome } from "@expo/vector-icons";
<FontAwesome name="user" size={24} />
```

## Platform-Specific Code

Use Platform detection when needed:
```tsx
import { Platform } from "react-native";

// Conditional rendering
{Platform.OS === 'web' && <WebOnlyComponent />}

// Conditional styles
<View className={Platform.OS === 'ios' ? 'pt-2' : 'pt-4'} />

// Component variants
components/ui/box/index.tsx      // Native
components/ui/box/index.web.tsx  // Web-specific
```

## Environment Setup

### Running the App
YOU CAN't Run the application

### Building for Production
DO NOT BUILD , do not use any npm run .... 

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure using `@/` path alias
2. **Style not applying**: Check NativeWind className syntax
3. **Component not found**: Verify component exists in `components/ui/`
4. **Dark mode not working**: Check `GluestackUIProvider` wrapper
5. **Form validation failing**: Verify Zod schema matches field names

## Resources

- **Gluestack UI Docs**: https://gluestack.io/ui/docs/home/overview/introduction
- **Expo Docs**: https://docs.expo.dev/
- **NativeWind Docs**: https://www.nativewind.dev/
- **React Hook Form**: https://react-hook-form.com/
- **Zod Validation**: https://zod.dev/

## Component Quick Reference

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| Button | Actions | variant, size, action |
| Input | Text entry | type, placeholder |
| FormControl | Form field wrapper | isInvalid, isRequired |
| VStack/HStack | Layout | space, className |
| Text/Heading | Typography | size, className |
| Toast | Notifications | action, variant |
| Modal | Dialogs | isOpen, onClose |
| Checkbox | Selections | isChecked, onChange |
| Link | Navigation | href |

## Notes for Claude Code

When building features in this codebase:
1. Always use existing Gluestack UI components from `components/ui/`
2. Follow the established patterns in `screens/auth/signin/` as reference
3. Use NativeWind classes for styling, not inline styles
4. Implement forms with React Hook Form + Zod validation
5. Use `@unitools/router` for navigation
6. Maintain the separation: `app/` (routes) imports from `screens/` (logic)
7. Test on multiple platforms (iOS, Android, Web) when possible
8. Follow responsive design patterns using Tailwind breakpoints
9. Use semantic color tokens for theme consistency
10. Leverage TypeScript for type safety throughout
