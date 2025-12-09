# Marvel Characters Browser

Frontend Developer Challenge – Bemobile

This project is a small web application that allows users to browse, search and mark Marvel characters as favorites.  
It includes a character list view and a detailed character view, following the UI requirements specified in the challenge.

## Features

### Characters List (Home)

- Displays the first 50 Marvel characters.

- Search bar that filters characters by name in real time.

- Favorites filter (`?favorites`) that shows only marked characters.

- Favorites counter in the navigation bar (persisted across pages).

### Character Detail Page

- Large hero section with broken-edge style (from Figma).

- Character image, name, description, and additional info.

- Favorite button synchronized with global favorites state.

- Smooth page transition animation (fade + slide).

- Red loading bar displayed under the header during data loading.

## Tech Stack

- **Next.js 16 (App Router)**

- **TypeScript**

- **React Context API** (Favorites management)

- **CSS Modules**

- **SuperHero API** (open-source alternative, as the official Marvel API is no longer accessible)

## Project Structure

```bash
src/
 ├── app/
 │    ├── page.tsx                # Characters list
 │    ├── characters/[id]/        # Character detail page
 │    └── layout.tsx              # Root layout + Navbar
 │
 ├── components/
 │    ├── layout/Navbar.tsx
 │    ├── ui/SearchBar.tsx
 │    ├── ui/LoadingBar.tsx
 │    └── CharacterCard/
 │         ├── CharacterCard.tsx
 │         └── CharacterCard.module.css
 │
 ├── context/
 │    └── FavoritesContext.tsx    # Global favorites state
 │
 ├── lib/
 │    ├── marvelApi.ts            # API helpers
 │    └── types.ts                # Character type definitions
 │
 └── styles/
      └── globals.css
```

## Installation & Setup

```bash
git clone https://github.com/your-username/marvel-challenge.git
cd marvel-challenge
npm install
```

## Development Mode

Starts the project with non-minified assets and hot reload.

```bash
npm run dev
```

Open: `http://localhost:3000`

## Deployment

The project is deployed on **Vercel**, using Next.js' optimized production build.

**Live Demo:** [marvel-challenge-six.vercel.app](https://marvel-challenge-six.vercel.app)

## Notes

- The official Marvel API (http://gateway.marvel.com/v1/) returns errors. Therefore, this challenge uses the open SuperHero API (https://akabab.github.io/superhero-api/api/all.json) and filters characters by publisher === "Marvel Comics".

- Comics section on the detail page has been omitted because the alternative API does not provide comic data.
