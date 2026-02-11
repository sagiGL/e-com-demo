# 🧪 OnUI CLI Testing on NextFaster E-Commerce

## Quick Start

```bash
cd /Users/sagi/e-com-demo

# Run OnUI init
node /Users/sagi/onui/packages/cli/dist/index.js init YOUR_PROJECT_KEY --verbose
```

## What You'll See

### 1️⃣ Layout Analysis Phase
```
✔ Analyzing layout file...
```
**Should detect:**
- File: `src/app/layout.tsx`
- Framework: Next.js 15 App Router
- Server component (async function)
- Existing providers: Analytics, SpeedInsights, Toaster
- Confidence: MEDIUM or HIGH

### 2️⃣ Interactive Preview
```
📋 Injection Preview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Changes to src/app/layout.tsx:
  + import { OnUIProvider } from '@/.onui/provider'
  
  <body>
  +   <OnUIProvider>
        {/* existing content */}
  +   </OnUIProvider>
  </body>

⚠️ Issues Detected:
  • Server component detected - may need 'use client'
  • 3 existing providers found

? Proceed with injection?
❯ Yes, inject the provider
  Skip this step  
  Show manual instructions
```

### 3️⃣ Injection & Verification
```
✔ Provider injected
✔ Verifying changes...
  ✓ Syntax valid
  ✓ AST parsed successfully
  ✓ OnUIProvider found
```

## Test Checklist

- [ ] CLI detects Next.js 15 correctly
- [ ] Analyzes `src/app/layout.tsx` (not `app/layout.tsx`)
- [ ] Detects async server component
- [ ] Finds existing providers (Analytics, SpeedInsights, Toaster)
- [ ] Shows interactive preview with diff
- [ ] Arrow keys navigate options
- [ ] Injection completes without errors
- [ ] Verification passes
- [ ] TypeScript check passes (`pnpm tsc --noEmit`)
- [ ] Eject restores original state
- [ ] No artifacts left after eject

## Commands

```bash
# Test init with dry-run first (safe, no changes)
node /Users/sagi/onui/packages/cli/dist/index.js init YOUR_KEY --dry-run

# Real init with verbose output
node /Users/sagi/onui/packages/cli/dist/index.js init YOUR_KEY --verbose

# Verify injection
cat src/app/layout.tsx | grep "OnUIProvider"

# Check TypeScript
pnpm tsc --noEmit

# Test eject
node /Users/sagi/onui/packages/cli/dist/index.js eject

# Verify eject cleaned up
git diff src/app/layout.tsx
```

## Expected Layout After Injection

The layout should have OnUIProvider wrapping the main content while preserving:
- ✅ Metadata export
- ✅ revalidate export  
- ✅ Async function signature
- ✅ All existing providers (Analytics, SpeedInsights, Toaster)
- ✅ All Suspense boundaries
- ✅ Header and footer structure

## Troubleshooting

**If analysis fails:**
```bash
# Check layout file exists
ls -la src/app/layout.tsx

# Try with verbose
--verbose
```

**If injection fails:**
```bash
# Use manual mode
# Select "Show manual instructions" in preview
# Follow the guide provided
```

**If verification fails:**
```bash
# CLI will offer rollback
# Choose "Yes" to undo changes
# Then try manual instructions
```

## Success Looks Like

```tsx
// src/app/layout.tsx (simplified)
import { OnUIProvider } from '@/.onui/provider';
import { Analytics } from "@vercel/analytics/react";
// ... other imports

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <OnUIProvider>
          {/* your content */}
        </OnUIProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Ready to test! 🚀
