# AI-Native Workflow Note

Candidate: Chelsie Lin (Lin Yu-Hsueh)

## Project: Collaborative Doc Editor (Ajaia Assignment)

Role: Technical Program & Project Manager (AI Delivery)

1. AI Engagement Philosophy
   As a TPM, my goal is delivery efficiency without compromising architectural integrity. For this project, I treated AI (Gemini/Cursor) as a "Senior Frontend Pair Programmer." I provided the product requirements and high-level architecture, while the AI handled boilerplate generation and CSS styling. My role was to provide the "Human-in-the-loop" oversight—specifically regarding permission logic and edge-case handling.

2. AI Toolstack
   Primary AI: Gemini (for architectural brainstorming and logic refinement).

IDE: Cursor / VS Code (for real-time code generation and debugging).

Workflow: Prompt-driven development with iterative manual refactoring.

3. The "Human-in-the-Loop" Moments
   AI is excellent at generating snippets but often misses the "Product Nuance." Here are three specific instances where I steered the AI to meet the Ajaia Spec:

A. Solving the "Nesting Conflict" (Headings vs. Lists)
Initially, the AI-generated code treated Headings and Lists as mutually exclusive (toggling one would delete the other).

AI Mistake: Defaulted to standard TipTap behavior where a node is either a paragraph, heading, or list item.

My Fix: I identified that for a professional doc editor, users expect to use Headings inside Bullet points. I manually refactored the TipTap schema configuration and added specific CSS (display: inline-block) to ensure the UI didn't break when nesting these elements.

B. Security & Ownership Logic
The AI initially suggested a wide-open editor.

My Fix: I introduced the isOwner state. I manually implemented logic to disable the toolbar, title input, and file import functions when the app is in "Guest View." This ensures the "Access Control" requirement (Task 3) is functionally robust, not just visual.

C. Dead Code & Logic Cleanup
During the development of the "Save" and "Sharing" modules, the AI left behind unused state hooks (setSharedUsers, saveStatus).

Action: I performed a manual code audit to ensure every state was hooked into a UI feedback loop (e.g., tying saveStatus to a color-coded status badge), ensuring a clean and maintainable codebase.

4. Efficiency Gain & ROI
   Traditional Estimated Time: 12–16 hours (
   setup, CSS styling, TipTap research, debugging).

AI-Native Time: ~5 hours.

Result: A 60%+ increase in velocity. By offloading the "Heavy Lifting" of CSS and boilerplate to AI, I was able to spend more time on Product Strategy (Task 3: Sharing) and Data Integrity (Task 4: Persistence).

5. Conclusion
   This workflow demonstrates my ability to lead AI-driven teams. I can move fast, but I remain the final gatekeeper for code quality, user experience, and requirement compliance.
