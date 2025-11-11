# 📸 How to Add Your Own Images

## Current Image Setup

The portfolio now uses high-quality Unsplash images that showcase the transition effects. Here's how to add your own images:

---

## Option 1: Use Your Own Image URLs

### For About Section (`components/About.tsx`):

Replace the image URLs on line 101:

```tsx
<AnimatedPhoto
  src="YOUR_IMAGE_URL_HERE"
  alt={section.title}
  className="w-full h-[600px] object-cover"
  parallax
/>
```

### For Projects Section (`components/Projects.tsx`):

Update the `projects` array (lines 13-38):

```tsx
const projects = [
  {
    title: 'Explorations',
    subtitle: 'Nothing left unseen',
    description: '...',
    image: 'YOUR_IMAGE_URL_HERE',  // ← Change this
  },
  // ... more projects
]
```

---

## Option 2: Use Local Images

### Step 1: Create an `public` folder

Create a folder called `public` in your project root:
```
ANTOHER PORTAFOLIO IDEA/
  ├── public/
  │   ├── images/
  │   │   ├── about-1.jpg
  │   │   ├── about-2.jpg
  │   │   ├── project-1.jpg
  │   │   └── project-2.jpg
  └── ...
```

### Step 2: Add Your Images

Put your image files in `public/images/`

### Step 3: Update Components

Use the image paths like this:

```tsx
// In About.tsx
<AnimatedPhoto
  src="/images/about-1.jpg"
  alt={section.title}
  className="w-full h-[600px] object-cover"
  parallax
/>

// In Projects.tsx
const projects = [
  {
    title: 'Explorations',
    image: '/images/project-1.jpg',  // ← Use /images/ path
    // ...
  },
]
```

---

## Image Requirements

### Recommended Sizes:
- **About Section**: 800x1000px (portrait)
- **Projects Section**: 1200x800px (landscape)
- **Hero Background**: 1920x1080px (wide)

### Formats:
- JPG (best for photos)
- PNG (best for graphics with transparency)
- WebP (best for web, smaller file size)

### File Size:
- Keep images under 500KB for fast loading
- Use image optimization tools if needed

---

## Image Optimization Tips

1. **Compress images** before uploading:
   - Use TinyPNG: https://tinypng.com/
   - Use Squoosh: https://squoosh.app/

2. **Use Next.js Image Optimization**:
   - The `AnimatedPhoto` component uses Next.js Image
   - Images are automatically optimized
   - Supports lazy loading

3. **CDN Options**:
   - Upload to Cloudinary
   - Upload to Imgur
   - Upload to your own server

---

## Current Image URLs (For Reference)

The portfolio currently uses these Unsplash images:

### About Section:
- Image 1: Mountain landscape
- Image 2: Mountain peak
- Image 3: Mountain range

### Projects Section:
- Project 1: Mountain landscape
- Project 2: Mountain peak  
- Project 3: Mountain range
- Project 4: Mountain landscape

All images are set to showcase:
- ✅ Scale-up animation on scroll
- ✅ Fade-in effect
- ✅ Parallax hover effect (3D rotation)
- ✅ Staggered entrance animations

---

## Testing Your Images

After adding images:

1. **Save the files**
2. **Check browser console** (F12) for image loading errors
3. **Test transitions**:
   - Scroll slowly to see fade-in effects
   - Hover over images to see parallax effect
   - Check mobile responsiveness

---

## Quick Replace Example

To quickly test with your own image:

1. Get an image URL (or use local file)
2. Open `components/Projects.tsx`
3. Find line 18 (first project image)
4. Replace with your URL:
   ```tsx
   image: 'https://your-image-url.com/image.jpg',
   ```
5. Save and refresh browser

The transition effects will work with any image!


