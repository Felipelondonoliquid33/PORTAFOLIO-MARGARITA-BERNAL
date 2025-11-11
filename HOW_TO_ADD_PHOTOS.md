# How to Add Your Photos to PhotoGridScroll Component

## Number of Images Needed

**Minimum: 23 images**
**Recommended: 25-26 images** (to account for random hiding)

### Breakdown:
- **Total grid panels**: 24 (3 rows × 8 columns)
- **Text panel**: 1 (index 11 - "Rawness" panel)
- **Photo slots**: 23
- **Randomly hidden**: 2-3 images per page load
- **Total needed**: 23-26 images

## Image Specifications

### Aspect Ratio
**3:4 (Portrait)** - This is critical! Your images should be taller than they are wide.

### Recommended Sizes

**For Best Quality (Retina/High-DPI displays):**
- **Width**: 1200px - 1600px
- **Height**: 1600px - 2133px (maintains 3:4 ratio)
- **Example**: 1200px × 1600px or 1500px × 2000px

**Minimum Size (Still Good Quality):**
- **Width**: 800px
- **Height**: 1067px (maintains 3:4 ratio)

### File Format
- **JPG/JPEG** (recommended for photos) - smaller file size
- **WebP** (best compression, modern browsers)
- **PNG** (only if you need transparency, larger files)

### File Size Optimization
- **Target**: Under 500KB per image (for fast loading)
- **Maximum**: 1MB per image
- Use tools like:
  - [TinyPNG](https://tinypng.com/) - Image compression
  - [Squoosh](https://squoosh.app/) - Google's image optimizer
  - Photoshop "Save for Web"
  - Lightroom export with quality settings

## Where to Place Images

1. Create folder: `public/images/` (or use existing structure)
2. Name your files consistently:
   - `photo-01.jpg`, `photo-02.jpg`, etc.
   - OR: `margarita-01.jpg`, `margarita-02.jpg`, etc.

## How to Update the Component

### Option 1: Replace URLs in Component (Recommended)

Open `components/PhotoGridScroll.tsx` and replace the `photos` array (lines 37-61):

```typescript
const photos = [
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-03.jpg',
  // ... add all 23-26 images
  '/images/photo-23.jpg',
]
```

### Option 2: Use a Folder Structure

If you have many images, you could create a helper:

```typescript
// Generate image paths
const photos = Array.from({ length: 23 }, (_, i) => 
  `/images/photo-${String(i + 1).padStart(2, '0')}.jpg`
)
```

## Quick Checklist

- [ ] Collect 23-26 portrait photos (3:4 aspect ratio)
- [ ] Resize to 1200×1600px (or 800×1067px minimum)
- [ ] Optimize file sizes (under 500KB each)
- [ ] Save as JPG or WebP format
- [ ] Place in `public/images/` folder
- [ ] Update `photos` array in `PhotoGridScroll.tsx`
- [ ] Test in browser to ensure images load correctly

## Current Display Sizes

Your images will be displayed at:
- **Mobile**: ~400px tall minimum
- **Tablet**: ~500px tall minimum  
- **Desktop**: ~600px tall minimum
- **Large screens**: ~700px tall minimum

So your source images should be **at least 2x larger** than the display size for crisp quality on retina displays.

## Example Calculation

For a desktop display (600px tall):
- Display width: ~450px (600px × 3/4 ratio)
- Source image should be: **900px × 1200px minimum**
- For retina: **1800px × 2400px** (2x)

**Recommendation**: Use **1200px × 1600px** as a good balance between quality and file size.

