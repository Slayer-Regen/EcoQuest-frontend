# Frontend Development Guide

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.tsx              # App entry point
│   ├── App.tsx               # Main app component with routing
│   ├── index.css             # Global styles + Tailwind
│   ├── store/
│   │   └── index.ts          # Redux store configuration
│   ├── services/
│   │   └── api.ts            # RTK Query API service
│   ├── slices/               # Redux slices
│   │   ├── authSlice.ts
│   │   └── uiSlice.ts
│   ├── components/           # Reusable components
│   │   └── ui/               # shadcn/ui components
│   ├── pages/                # Page components
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   └── types/                # TypeScript types
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── Dockerfile.dev
```

## 🚀 Getting Started

### Local Development (without Docker)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   # Create .env.local file
   echo "VITE_API_URL=http://localhost:3000" > .env.local
   echo "VITE_GOOGLE_CLIENT_ID=your-google-client-id" >> .env.local
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

The app will be available at http://localhost:5173

## 🎨 UI Components

This project uses **shadcn/ui** components. To add new components:

```bash
# Example: Add a button component
npx shadcn-ui@latest add button

# Add a card component
npx shadcn-ui@latest add card
```

Components will be added to `src/components/ui/`

## 🔄 State Management

### Redux Toolkit

The app uses Redux Toolkit with the following slices:

- **authSlice**: User authentication state
- **uiSlice**: UI state (modals, toasts)

### RTK Query

API calls use RTK Query for automatic caching and state management:

```typescript
import { useGetActivitiesQuery, useCreateActivityMutation } from '@/services/api';

function MyComponent() {
  const { data, isLoading } = useGetActivitiesQuery();
  const [createActivity] = useCreateActivityMutation();
  
  // Use the data...
}
```

## 🎯 Adding New Features

### 1. Add a new page

Create a file in `src/pages/`:

```typescript
// src/pages/MyPage.tsx
export default function MyPage() {
  return <div>My Page</div>;
}
```

Add route in `App.tsx`:

```typescript
<Route path="/my-page" element={<MyPage />} />
```

### 2. Add a new API endpoint

Update `src/services/api.ts`:

```typescript
endpoints: (builder) => ({
  getMyData: builder.query({
    query: () => '/api/my-data',
    providesTags: ['MyData'],
  }),
})
```

### 3. Add a new Redux slice

Create file in `src/slices/mySlice.ts` and add to store in `src/store/index.ts`

## 🎨 Styling

### Tailwind CSS

Use Tailwind utility classes:

```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>
```

### Theme Variables

Customize theme in `src/index.css`:

```css
:root {
  --primary: 142 76% 36%;  /* Green theme */
  --radius: 0.5rem;
}
```

### Dark Mode

Toggle dark mode by adding `dark` class to `<html>`:

```typescript
document.documentElement.classList.toggle('dark');
```

## 📊 Data Visualization

Use Recharts for charts:

```typescript
import { LineChart, Line, XAxis, YAxis } from 'recharts';

<LineChart data={data}>
  <XAxis dataKey="date" />
  <YAxis />
  <Line type="monotone" dataKey="co2" stroke="#10b981" />
</LineChart>
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

## 🏗️ Building for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

Build output will be in `dist/`

## 🔧 Development Tips

### Hot Module Replacement (HMR)

Vite provides instant HMR. Changes will reflect immediately without full page reload.

### Path Aliases

Use `@/` for imports:

```typescript
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
```

### Environment Variables

Access env vars with `import.meta.env`:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

All env vars must be prefixed with `VITE_`

## 🎨 Design System

### Colors

- **Primary**: Green (#10b981) - Eco-friendly theme
- **Secondary**: Blue-gray - Supporting elements
- **Destructive**: Red - Errors and warnings

### Typography

- Headings: Bold, larger sizes
- Body: Regular weight
- Use semantic HTML (`<h1>`, `<p>`, etc.)

### Spacing

Use Tailwind spacing scale (4px increments):
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px

## 🐛 Troubleshooting

### Module not found errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind classes not working

```bash
# Rebuild Tailwind
npm run dev
```

### API calls failing

- Check backend is running on port 3000
- Verify VITE_API_URL in .env.local
- Check browser console for CORS errors

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
