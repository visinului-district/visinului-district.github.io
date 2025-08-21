# Project Structure

This project has been refactored to follow a professional, scalable architecture. Here's the breakdown of the new structure:

## 📁 Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   │   ├── BarrierCard.tsx
│   │   ├── ContactsCard.tsx
│   │   ├── DeviceStatus.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── PinInput.tsx
│   │   └── WeatherCard.tsx
│   └── index.ts         # Component exports
├── constants/           # Application constants
│   └── index.ts        # API endpoints, routes, weather codes
├── hooks/              # Custom React hooks
│   ├── useBarrier.ts   # Barrier control logic
│   ├── usePinGenerator.ts # Pin generation logic
│   ├── useWeather.ts   # Weather data fetching
│   ├── useWeatherDescription.ts # Weather translation
│   └── index.ts        # Hook exports
├── layouts/            # Layout components
│   └── MainLayout.tsx  # Main page layout with header
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── utils/              # Utility functions
│   ├── weather.ts      # Weather formatting utilities
│   └── index.ts        # Utility exports
├── views/              # Page components
│   ├── CommunityView.tsx    # Home page (formerly comunity.tsx)
│   ├── GuestsView.tsx       # Guest access page
│   ├── PinGeneratorView.tsx # Pin generation page
│   ├── PlaygroundView.tsx   # Playground rules page
│   └── index.ts        # View exports
├── data/               # Static data files
├── locales/            # Internationalization files
└── assets/             # Static assets
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Views**: Page-level components that orchestrate the UI
- **Components**: Reusable UI elements
- **Hooks**: Business logic and state management
- **Utils**: Pure functions for data transformation
- **Types**: TypeScript interfaces for type safety

### 2. **Clean Imports**
- Each folder has an `index.ts` file for clean imports
- Components can be imported as `import { Component } from '../components'`
- Hooks can be imported as `import { useHook } from '../hooks'`

### 3. **Consistent Naming**
- Views are suffixed with "View" (e.g., `CommunityView`)
- Components use PascalCase (e.g., `BarrierCard`)
- Hooks use camelCase with "use" prefix (e.g., `useWeather`)
- Constants use UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)

### 4. **Type Safety**
- All components use TypeScript interfaces
- Props are properly typed
- API responses have defined types

## 🔄 Refactoring Changes

### File Renames and Moves:
- `comunity.tsx` → `views/CommunityView.tsx`
- `guests.tsx` → `views/GuestsView.tsx`
- `playground.tsx` → `views/PlaygroundView.tsx`
- `pin-generator.tsx` → `views/PinGeneratorView.tsx`
- `language-switch.tsx` → `components/ui/LanguageSwitcher.tsx`

### New Components Created:
- `BarrierCard` - Reusable barrier control component
- `WeatherCard` - Weather display component
- `ContactsCard` - Contact information component
- `PinInput` - Reusable PIN input component
- `DeviceStatus` - Device status indicator
- `MainLayout` - Common page layout

### New Hooks Created:
- `usePinGenerator` - PIN generation logic
- `useWeatherDescription` - Weather translation logic

### Constants Extracted:
- API endpoints centralized
- Routes defined as constants
- Weather codes mapped
- Default coordinates defined

## 🚀 Benefits

1. **Maintainability**: Clear separation makes the code easier to maintain
2. **Reusability**: Components can be easily reused across views
3. **Testability**: Isolated hooks and components are easier to test
4. **Scalability**: New features can be added following the same patterns
5. **Type Safety**: Comprehensive TypeScript types prevent runtime errors
6. **Developer Experience**: Clean imports and consistent naming improve DX

## 📝 Usage Examples

### Creating a new view:
```tsx
// views/NewView.tsx
import { MainLayout } from "../layouts/MainLayout";
import { SomeComponent } from "../components";
import { useSomeHook } from "../hooks";

export function NewView() {
  const data = useSomeHook();
  
  return (
    <MainLayout>
      <SomeComponent data={data} />
    </MainLayout>
  );
}
```

### Creating a new component:
```tsx
// components/ui/NewComponent.tsx
import type { SomeType } from '../../types';

interface NewComponentProps {
  data: SomeType;
}

export function NewComponent({ data }: NewComponentProps) {
  return <div>{/* component JSX */}</div>;
}
```

### Adding to exports:
```typescript
// components/index.ts
export { NewComponent } from './ui/NewComponent';
```
