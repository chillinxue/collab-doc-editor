# Architecture Note: Collaborative Doc Editor

**Project:** Ajaia Technical Assignment  
**Author:** Chelsie Lin (Lin Yu-Hsueh)  
**Role:** Technical Program & Project Manager candidate

---

## 1. Technical Stack Selection

### Frontend: React (Vite)

I chose React for its component-based architecture, which allows for clean separation between the Editor logic, the Toolbar, and the Sharing status components. Vite was selected as the build tool to ensure a near-instant development cycle and optimized production builds.

### Editor Engine: TipTap (ProseMirror-based)

Instead of building a rich-text engine from scratch, I integrated **TipTap**.

- **Reasoning:** It is a "headless" editor framework, meaning it provides the logic but allows full CSS/UI customization. This was essential to meet the specific UI requirements of the Ajaia spec while maintaining a robust document schema.

### Persistence: LocalStorage API

I deliberately opted for **LocalStorage** as the primary data store.

- **Trade-off Analysis:** While a cloud database (like Supabase) would allow true multi-device sync, LocalStorage provides 100% uptime, zero latency, and zero configuration for the reviewer. Given the 6-hour delivery window, I prioritized a "flawless first-run experience" over complex backend integration.

---

## 2. Key Architectural Decisions

### A. Simulated Multi-User Logic (Access Control)

Since the app runs locally, I implemented an `isOwner` state to simulate Role-Based Access Control (RBAC).

- When `isOwner` is false, the system triggers a **Read-only mode** by disabling the TipTap `editable` property and hiding/disabling critical UI elements (Toolbar, Rename input, File Import). This demonstrates a deep understanding of data security and user permissions.

### B. State-Driven UI Feedback

I implemented a centralized `saveStatus` state. This state is not just a variable; it drives the color-coded UI badges ("Saving...", "Saved", "Imported"). This ensures the system remains "Transparent" to the user, a core principle in modern SaaS product design.

### C. File Handling Strategy

The import functionality (Task 2) utilizes the browser's `FileReader` API. To maintain data integrity, I implemented a "Content Wrapping" logic that ensures raw text from `.txt` files is correctly parsed into HTML paragraphs, preventing schema breakage within the rich-text engine.

---

## 3. Challenges & Technical Resolutions

### Nested Node Handling

**Problem:** In many editors, applying a Heading style to a List Item often breaks the list structure.
**Resolution:** I reconfigured the TipTap schema and customized the CSS (`display: inline-block`) for `li h1/h2` tags. This allows users to create structured, professional outlines where headings can coexist within bulleted lists.

### Persistence Synchronization

**Problem:** Manual imports often bypass the standard `onUpdate` loop of the editor.
**Resolution:** I implemented a manual save trigger within the `handleFileUpload` function to force a state sync with LocalStorage immediately after a successful import, ensuring no data loss on refresh.

---

## 4. Future Roadmap (If given 2 more weeks)

1. **Database Migration:** Transition from LocalStorage to a real-time DB (PostgreSQL via Supabase) for true collaboration.
2. **Websocket Integration:** Implement real-time presence indicators and collaborative cursors.
3. **Draft Versioning:** Add a "History" tab using a simple snapshotting logic in the database to allow users to revert changes.
