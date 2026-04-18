# Troubleshooting Guide

## Common Issues and Solutions

### LaTeX Formulas Not Rendering

**Problem:** Math formulas show as plain text instead of formatted equations.

**Solution:**
1. Check that KaTeX CSS is imported in `/src/styles/katex.css`
2. Verify the formula syntax:
   - Inline: `$formula$`
   - Block: `$$formula$$`
3. Common LaTeX errors:
   - Use `\frac{a}{b}` not `\fraction{a}{b}`
   - Use `\sum` not `\summation`
   - Escape backslashes in strings: `\\frac` in TypeScript

**Example:**
```typescript
// ✅ Correct
const content = "$$\\frac{a}{b}$$";

// ❌ Wrong
const content = "$$\frac{a}{b}$$";
```

### Dark Mode Not Working

**Problem:** Theme toggle doesn't switch between light and dark mode.

**Solution:**
1. Make sure `ThemeProvider` wraps the app in `App.tsx`
2. Check localStorage for the `theme` key
3. Verify dark mode classes in `theme.css`
4. Clear browser cache and reload

**Manual Fix:**
```javascript
// In browser console
localStorage.setItem('theme', 'dark');
window.location.reload();
```

### Can't See Organizer Features

**Problem:** "Add Competition" button doesn't appear even after signing in.

**Solution:**
1. Sign out completely
2. Sign up/in with an email containing "organizer"
   - Example: `organizer@test.com`
3. Check in browser console:
   ```javascript
   JSON.parse(localStorage.getItem('user'))
   // Should show: { ..., isOrganizer: true }
   ```

### Problems Not Showing in Competition

**Problem:** Competition detail page shows "Sign In Required" even when signed in.

**Possible Causes:**
1. Competition hasn't started yet
   - Check start date in competition details
   - Only upcoming competitions hide problems
2. Not signed in
   - Check user icon in header
   - Try signing out and in again

**Solution:**
- For testing, edit the competition's `startDate` in `/src/app/data/competitions.ts` to a past date
- Or wait until the actual start date

### Markdown Not Formatting

**Problem:** Markdown shows as plain text.

**Solution:**
1. Ensure you're using the `MarkdownRenderer` component
2. Check that content is passed as a string prop
3. Verify `react-markdown` is installed

**Example:**
```tsx
// ✅ Correct
<MarkdownRenderer content={competition.fullDescription} />

// ❌ Wrong
<div>{competition.fullDescription}</div>
```

### Competition Form Not Submitting

**Problem:** "Create Competition" button does nothing.

**Solution:**
1. Check browser console for errors
2. Ensure all required fields are filled:
   - Title
   - Short Description
   - Full Description
   - Difficulty
   - Start Date
   - End Date
3. Verify at least one problem is added
4. Check that form has `onSubmit` handler

### Images Not Loading

**Problem:** Background images or profile pictures don't display.

**Solution:**
1. Verify image URL is valid and accessible
2. Check CORS policy for external images
3. Use HTTPS URLs, not HTTP
4. Test URL in browser directly

**Recommended Image Sources:**
- Unsplash (https://unsplash.com)
- Pexels (https://pexels.com)
- Own hosted images

### Filters Not Working

**Problem:** Competition filters don't filter the list.

**Solution:**
1. Check state updates in `CompetitionsList.tsx`
2. Verify filter values match competition data
3. Clear search query if filtering by difficulty/status

**Debug:**
```tsx
// Add console.log in filter function
const filteredCompetitions = competitions.filter((comp) => {
  console.log('Filtering:', comp.title, comp.difficulty);
  // ... filter logic
});
```

### Toast Notifications Not Appearing

**Problem:** Success/error messages don't show.

**Solution:**
1. Verify `<Toaster />` is in `Root.tsx`
2. Check that `toast` is imported from `sonner`
3. Make sure ThemeContext is available

**Test:**
```tsx
import { toast } from 'sonner';

// Anywhere in a component
toast.success('Test message');
```

### Dates Showing Incorrectly

**Problem:** Competition dates display wrong format or timezone.

**Solution:**
1. Check `date-fns` import and usage
2. Ensure dates are in ISO format: `YYYY-MM-DD`
3. Use `format()` from date-fns consistently

**Example:**
```tsx
import { format } from 'date-fns';

const formattedDate = format(new Date(competition.startDate), "MMM d, yyyy");
```

### Router Navigation Issues

**Problem:** Navigation doesn't work or causes errors.

**Solution:**
1. Use `useNavigate()` hook for programmatic navigation
2. Use `<Link>` component for links, not `<a>`
3. Ensure `RouterProvider` is in `App.tsx`

**Correct Usage:**
```tsx
// ✅ Correct
import { Link, useNavigate } from 'react-router';

<Link to="/competitions">View</Link>

const navigate = useNavigate();
navigate('/competitions');

// ❌ Wrong
<a href="/competitions">View</a>
window.location.href = '/competitions';
```

### Authentication State Lost on Refresh

**Problem:** User gets logged out when refreshing the page.

**Solution:**
This is expected behavior as it's using localStorage. The auth state should persist because:
1. `AuthContext` reads from localStorage on init
2. Check that browser allows localStorage
3. Verify no extensions are blocking storage

**Verify:**
```javascript
// Browser console
localStorage.getItem('user');
// Should return user JSON string
```

### KaTeX CSS Not Loading

**Problem:** LaTeX renders but looks unstyled.

**Solution:**
1. Check `/src/styles/katex.css` exists and contains CDN import
2. Verify it's imported in `/src/styles/index.css`
3. Check network tab in DevTools for 404s

**Manual Fix:**
Add to `<head>` in `index.html`:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
```

## Performance Issues

### Page Loading Slowly

**Solutions:**
1. Optimize images (compress, use appropriate sizes)
2. Reduce bundle size (check imports)
3. Use lazy loading for routes (future enhancement)

### Too Many Re-renders

**Solutions:**
1. Memoize expensive computations with `useMemo`
2. Use `useCallback` for function props
3. Check for unnecessary state updates

## Browser Compatibility

### Tested Browsers
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ Internet Explorer (not supported)

### Mobile Browsers
- ✅ iOS Safari
- ✅ Chrome Android
- ✅ Samsung Internet

## Getting Help

If you encounter an issue not listed here:

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for error messages in Console tab
   - Check Network tab for failed requests

2. **Verify Installation**
   ```bash
   # Check all dependencies are installed
   npm ls
   
   # Reinstall if needed
   rm -rf node_modules
   npm install
   ```

3. **Clear Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear localStorage: `localStorage.clear()` in console
   - Clear cookies for the domain

4. **Check File Structure**
   Ensure all files exist:
   ```
   /src/app/
     - App.tsx
     - routes.tsx
     - /components/
       - Home.tsx
       - CompetitionsList.tsx
       - CompetitionDetail.tsx
       - AddCompetition.tsx
       - etc.
     - /context/
       - AuthContext.tsx
       - ThemeContext.tsx
   ```

5. **Review Recent Changes**
   - Check git diff if using version control
   - Undo recent edits that might have broken something

## Development Tips

### Hot Reload Not Working

**Solution:**
```bash
# Restart dev server
npm run dev
```

### TypeScript Errors

Common fixes:
```tsx
// Type assertion for event handlers
onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}

// Type for state
const [data, setData] = useState<string>("");

// Optional chaining for safety
competition?.title
```

### ESLint Warnings

Most warnings can be safely ignored during development, but fix them for production:
- Unused imports
- Missing dependencies in useEffect
- Unescaped entities in JSX

## Quick Fixes Checklist

- [ ] Clear browser cache
- [ ] Check localStorage for theme and user
- [ ] Verify all npm packages are installed
- [ ] Check browser console for errors
- [ ] Ensure dates are in correct format
- [ ] Verify image URLs are accessible
- [ ] Test with different browsers
- [ ] Check that required fields are filled
- [ ] Verify file paths are correct
- [ ] Look for typos in component names

---

If all else fails, start with a fresh browser session in incognito mode to rule out extension conflicts or cached data issues.
