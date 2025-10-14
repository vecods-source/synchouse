# Synchouse Agency Website

A modern, professional landing page for Synchouse - a software agency specializing in digital solutions. The website features a unique blend of retro pixel aesthetics inspired by classic Windows interfaces with contemporary design principles.

## 🎨 Design Philosophy

The website combines nostalgia with modernity, featuring:
- **Retro Windows Aesthetic**: Subtle pixel-style elements, window-frame UI components, and classic computing references
- **Modern Professional Look**: Clean layouts, smooth animations, and contemporary typography
- **Light & Airy**: Predominantly white/light gray background with strategic use of accent colors
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing

## 🎯 Sections

### 1. Hero Section
- **Purpose**: First impression and value proposition
- **Features**: 
  - Bold headline with gradient accent text
  - Clear call-to-action buttons that scroll to relevant sections
  - Statistics showcase (Projects, Clients, Years, Success rate)
  - Subtle animated pixel decorations in the background
- **Style**: Clean, spacious layout with gradient background transitioning from white to light secondary color

### 2. Services Section
- **Purpose**: Showcase the agency's core offerings
- **Services Offered**:
  - ERP Systems
  - CRM Solutions
  - E-Commerce Platforms
  - Mobile Applications
  - AI Agents
  - Appointment Management Systems
- **Style**: Modern card-based layout with hover effects, icons, and clean typography

### 3. Why Us Section
- **Purpose**: Highlight competitive advantages and unique selling points
- **Features**:
  - Fast Delivery
  - Enterprise Security
  - Expert Team
  - Scalable Solutions
  - Warranty & Maintenance
  - Contract & In-Person Meetings
- **Interactive Element**: "Schedule a Consultation" button opens a modal form
- **Consultation Form**: Collects name, phone, service type, preferred date/time, and contact method
- **Style**: Retro Windows-inspired cards with pixel corners, window-style title bars, and monospace fonts

### 4. Contact Section
- **Purpose**: Enable direct communication with potential clients
- **Left Side**: 
  - WhatsApp quick contact button
  - Email, phone, and location information cards
- **Right Side**: Comprehensive contact form with fields for:
  - Name (required)
  - Email (optional)
  - Company Name (optional)
  - Contact Number (required)
  - Preferred Contact Method: Call or WhatsApp (required)
  - Preferred Date & Time (required)
  - Message (required)
- **Integration**: Forms send emails to synchouse26@gmail.com using Resend API
- **Style**: Clean, professional form layout with proper validation and user feedback

### 5. Footer
- **Purpose**: Additional navigation and legal information
- **Content**: Company info, quick links, and copyright notice
- **Style**: Minimal, clean design

## 🎨 Style Details

### Color Palette
- **Background**: `oklch(0.99 0 0)` - Pure white/off-white
- **Foreground**: `oklch(0.15 0 0)` - Near black for text
- **Accent**: `oklch(0.55 0.15 250)` - Blue accent color (primary brand color)
- **Secondary**: `oklch(0.95 0 0)` - Light gray for subtle backgrounds
- **Muted**: `oklch(0.96 0 0)` - Very light gray for muted elements

### Typography
- **Primary Font**: Geist Sans - Modern, clean sans-serif for body text and most headings
- **Monospace Font**: Geist Mono - Used sparingly in the "Why Us" section for retro aesthetic
- **Font Sizes**: Responsive scaling from mobile to desktop
- **Line Height**: 1.5-1.6 for optimal readability

### Layout & Spacing
- **Container**: Max-width with responsive padding
- **Section Padding**: Consistent vertical spacing (py-24)
- **Grid System**: CSS Grid and Flexbox for responsive layouts
- **Breakpoints**: Mobile-first approach with md: and lg: breakpoints

### Interactive Elements
- **Buttons**: Accent color background with hover effects and subtle shadows
- **Cards**: Border with shadow, hover state increases shadow depth
- **Animations**: Subtle, reduced motion for professional feel
  - Pulse effects on decorative pixels
  - Smooth transitions on hover states
  - Scroll-triggered smooth scrolling to sections
- **Progress Bar**: Horizontal bar at top of page showing scroll progress (replaces traditional scrollbar)

### Unique Design Features
- **Pixel Decorations**: Small square elements scattered in hero section with pulse animations
- **Window Frames**: Retro Windows-style cards in "Why Us" section with title bars
- **Pixel Corners**: Custom CSS class for sharp, pixelated corner styling
- **Hidden Scrollbar**: Custom scrollbar hidden, replaced with progress indicator
- **Floating Navigation**: Fixed header with backdrop blur and subtle shadow

## 🛠️ Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui component library
- **Fonts**: Geist Sans & Geist Mono
- **Email Service**: Resend API
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind utilities

## 📧 Email Integration

The website uses Resend API for email functionality:
- **Contact Form**: Sends inquiries to synchouse26@gmail.com
- **Consultation Form**: Sends consultation requests to synchouse26@gmail.com
- **API Key**: Configured via environment variable `RESEND_API_KEY`

## 🚀 Key Features

1. **Smooth Scroll Navigation**: All navigation links smoothly scroll to their respective sections
2. **Form Validation**: Client-side validation with clear error messages
3. **Responsive Design**: Optimized for all screen sizes
4. **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation support
5. **Performance**: Optimized images, minimal JavaScript, fast load times
6. **SEO Friendly**: Proper meta tags, semantic structure, descriptive content

## 📱 Responsive Behavior

- **Mobile (< 768px)**: Single column layout, stacked navigation, touch-optimized buttons
- **Tablet (768px - 1024px)**: Two-column grids, expanded navigation
- **Desktop (> 1024px)**: Full multi-column layouts, floating header, optimal spacing

## 🎯 Call-to-Actions

Primary CTAs guide users through the conversion funnel:
1. **Hero**: "Start Your Project" → Scrolls to Contact
2. **Hero**: "View Services" → Scrolls to Services
3. **Header**: "Get Started" → Scrolls to Contact
4. **Why Us**: "Schedule a Consultation" → Opens modal form
5. **Contact**: "WhatsApp Us" → Opens WhatsApp chat
6. **Contact**: "Send Message" → Submits contact form

## 🔧 Customization

To customize the website:
- **Colors**: Edit CSS variables in `app/globals.css`
- **Content**: Update component files in `components/` directory
- **Services**: Modify the services array in `components/services-section.tsx`
- **Contact Info**: Update email, phone, location in `components/contact-section.tsx`
- **Fonts**: Change font imports in `app/layout.tsx`

## 📄 License

© 2025 Synchouse. All rights reserved.
