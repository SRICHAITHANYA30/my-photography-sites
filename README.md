# Photography Website

A simple, modern photography portfolio website with booking and contact functionality.

## Features

✅ **Portfolio Showcase** - Display your photography work in a beautiful gallery
✅ **Easy Booking** - Contact form for clients to book sessions
✅ **Service Information** - Showcase your photography services
✅ **Promotional Space** - Dedicated section for ads and promotions
✅ **Responsive Design** - Works perfectly on all devices

## Getting Started

1. Open `index.html` in your web browser
2. Customize the content to match your photography business

## Customization

### Adding Hero Background Image

1. Create an `images` folder in the project directory
2. Add your hero background image and name it `hero-bg.jpg`
3. Place it in the `images` folder
4. The image will automatically appear as the hero background
5. If no image is provided, a gradient background will be used as fallback

### Adding Gallery Photos

1. Create an `images` folder in the project directory (if not already created)
2. Add your photos to the `images` folder
3. Open `script.js` and uncomment the gallery image section at the bottom
4. Add your images like this:
   ```javascript
   addGalleryImage('images/your-photo1.jpg', 'Description of photo');
   addGalleryImage('images/your-photo2.jpg', 'Description of photo');
   ```

### Updating Contact Information

Edit the contact information in `index.html`:
- Email address
- Phone number
- Location

### Customizing Colors

Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
}
```

### Adding Promotions/Ads

The promotional banner section is already set up. Edit the content in `index.html`:
```html
<section class="promo-banner" id="promo-section">
    <!-- Your ad/promotion content here -->
</section>
```

## Form Submission

Currently, the contact form logs data to the console. To make it functional:

1. Set up a backend service (e.g., Formspree, Netlify Forms, or your own server)
2. Update the form submission handler in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use and modify for your photography business.

