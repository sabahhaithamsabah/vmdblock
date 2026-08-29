# vm detect

A minimal static site that runs a client-side VM detector on page load.

## Project structure

```
lecture-portal/
├── index.html        ← the page itself
├── style.css          ← styling
├── vm-detector.js      ← the detection script
└── README.md
```

Three separate files, all in the same folder. `index.html` links to the other two — you don't need to paste anything *inside* `index.html` manually, the `<link>` and `<script>` tags already point at them.

\---

## Part 1 — Run it locally first

1. Put all three files (`index.html`, `style.css`, `vm-detector.js`) in the same folder.
2. Double-click `index.html`, or drag it into a browser tab.
3. It should run the check and show pass/blocked + the debug panel.

No install, no server, no admin rights needed for this step — it's just files opening in a browser.

\---

anyone to visit.

\---

## Part 2 — Adding this to an *existing* site instead

If you already have another site and just want to bolt the VM check onto it:

1. Copy `vm-detector.js` into your existing project folder (anywhere, e.g. a `/js/` folder).
2. In every HTML page you want protected, add this line right before the closing `</body>` tag:

```html
   <script src="vm-detector.js"></script>
   ```

   (adjust the path if you put it in a subfolder, e.g. `<script src="js/vm-detector.js"></script>`)

3. Make sure your page has these two elements somewhere, since the script looks for them by ID:

```html
   <div id="status" class="status checking">Checking environment…</div>
   <div id="content"> ... your real page content ... </div>
   ```

4. Optionally add the debug panel too:

```html
   <details id="debug">
     <summary>Debug: raw signals</summary>
     <div id="debug-body">Running checks…</div>
   </details>
   ```

5. Copy the relevant CSS classes (`.status`, `.checking`, `.ok`, `.blocked`, `#content`, `#debug`) from `style.css` into your site's existing stylesheet, or just link `style.css` directly.

\---

