# TechVault PC — Online Store

A simple, modern website for an online store that sells PCs and PC accessories.

## What’s included

- **Homepage** — Hero, category links, featured products
- **Products** — Catalog with category and sort filters
- **Product detail** — Single product view with add to cart
- **Cart** — View items, change quantity, remove items (checkout is demo-only)

Cart data is stored in the browser (localStorage) so it persists between visits.

## How to run

1. Open the project folder in your editor.
2. Serve the site with a local server (recommended so links work correctly):
   - **VS Code / Cursor:** Install the “Live Server” extension and right‑click `index.html` → “Open with Live Server”.
   - **Node:** Run `npx serve .` in the project folder and open the URL shown.
   - **Python:** Run `python -m http.server 8000` and open `http://localhost:8000`.
3. Or open `index.html` directly in your browser (some features may behave differently without a server).

## Project structure

```
WEBSITE TEST/
├── index.html      # Homepage
├── products.html   # Product catalog with filters
├── product.html    # Single product page (?id=1, etc.)
├── cart.html       # Shopping cart
├── css/
│   └── style.css   # Global styles
├── js/
│   └── main.js     # Cart logic, nav count, add-to-cart
└── README.md
```

## Customization

- **Products:** Edit the `PRODUCTS` arrays in `products.html` and `product.html` to add or change items.
- **Branding:** Change “TechVault PC” and the logo in the nav/footer of each HTML file.
- **Styles:** Adjust colors and fonts in `css/style.css` (see `:root` variables at the top).

## Next steps (optional)

- Add real product images (replace the emoji placeholders in the product data).
- Connect a backend for checkout, user accounts, and inventory.
- Add search, more filters, or a wishlist.
